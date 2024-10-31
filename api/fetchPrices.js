const express = require("express")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3050

app.use(express.json())



app.get("/api/data/polygon", async (req, res) => {
    const { pr, tf, du } = req.query;

    if (!pr || !tf || !du) {
        return res.status(400).json({ error: "Incomplete Parameters!" });
    }

    // Set to daily data as intraday might be restricted on free tier
    const multiplier = parseInt(tf) || 1;
    const timespan = "day";

    // Fixed date range for testing
    const from = "2023-01-01";
    const to = "2023-01-31";

    try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${pr}/range/${multiplier}/${timespan}/${from}/${to}`, {
            params: {
                adjusted: true,
                sort: "asc",
                limit: 10,
                apikey: process.env.POLYGON_API_KEY || "X7KKZGq0jkOpwcaqnuDhmA0lcC9fZsGm" // Make sure your API key is in .env
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            return res.status(404).json({ error: "No data found for specified parameters." });
        }

        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.response ? error.response.data : error.message,
        });
    }
});

app.get("/api/data/alpha-vantage", async (req, res) => {
    const { pr, tf, du } =  req.query
    
    const interval = tf
    const backhours = du

    if(!pr || !tf || !du){
        return res.status(400).json({
            error: "Failed to Incomplete Parameters!!",
        })
    }


    if(!interval || !backhours){
        return res.status(400).json({
            error: "Invalid Timeframe &/ Duration.",
        })
    }

    try {
        const response = await axios.get("https://alphavantage.co/query", {
            params: {
                function: "TIME_SERIES_INTRADAY",
                symbol: pr,
                interval: interval,               
                outputsize: "full",
                apikey: "AFRKDTP67QNLOLAC"
            },
        })
        res.json(response.data)
        

        // res.json(response.data[`Time Series (${interval})`])

        //This is currently unable to function
        //I will get back to it if we need it later
        
        // const data = response.data[`Time Series (${interval})`]

        // if(!data){
        //     return res.status(404).json({
        //         error: "Data not found!!!"
        //     })
        // }

        // const now = new Date()
        // const results = Object.entries(data)
        // .filter(([timestamp]) => {
        //     const date = new Date(timestamp)
        //     return (now - date) / (1000 * 60 * 60) <= backhours
        // })
        // .map(([timestamp, values]) => ({
        //     timestamp,
        //     ...values,
        // }))

        // res.json(results)
        
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.message,
        })
    }


})

app.listen(PORT, () =>{
    console.log("Server is Running on port 3050")
})