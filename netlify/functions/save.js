exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    const airtableUrl = "https://airtable.com/appuV2qNUav59BzfW/tblkbG1G66nO4pREg/viwW81FyzG12vbnlp";
    
    // ВСТАВ СВІЙ ТОКЕН З AIRTABLE (починається на pat...) У ЛАПКИ НИЖЧЕ:
    const token = "patPicFIhqfL7A3uM";

    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          "Date": data.date,
          "userId": data.userId,
          "Score": data.score,
          "Sleep": data.sleep,
          "ScreenTime": data.screenTime,
          "Fatigue": data.fatigue,
          "Speed": data.speed,
          "Accuracy": data.accuracy,
          "Email": data.email
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Airtable error: ${errText}`);
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true }) 
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
};
