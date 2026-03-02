import express from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());

function runWhirl(args, shouldParseFloat) {
    const p = spawn("./whirl", args);

    let out = "";
    let err = "";

    p.stdout.on("data", d => out += d.toString());
    p.stderr.on("data", d => err += d.toString());

    p.on("close", code => {
        let valueToGive;
        if (shouldParseFloat) {
            valueToGive = parseFloat(out.replace("\n", "").trim());
        } else {
            valueToGive = out.replace("\n", "").trim();
        }

        res.json({
            value: valueToGive,
        });
    });
}


app.post("/generate", (req, res) => {
    runWhirl(["generate"], true);
});

app.post("/generateString", (req, res) => {
    runWhirl(["generateString"], false);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on", port);
});