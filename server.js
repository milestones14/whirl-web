import express from "express";
import { spawn } from "child_process";

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        req.headers["access-control-request-headers"] || "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

function runWhirl(res, args, shouldParseFloat) {
    const p = spawn("./whirl", args);

    let out = "";
    let err = "";
    let replied = false;

    p.stdout.on("data", d => out += d.toString());
    p.stderr.on("data", d => err += d.toString());

    p.on("error", e => {
        if (replied) return;
        replied = true;
        res.status(500).json({ error: "Internal error occurred: " + e.message });
    });

    p.on("close", code => {
        if (replied) return;
        replied = true;

        let valueToGive;
        if (shouldParseFloat) {
            valueToGive = parseFloat(out.trim());
        } else {
            valueToGive = out.trim();
        }

        res.json({
            exitCode: code,
            value: valueToGive,
            stderr: err
        });
    });
}

app.post("/generate", (req, res) => {
    runWhirl(res, ["generate"], true);
});

app.post("/generateString", (req, res) => {
    runWhirl(res, ["generateString"], false);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on", port);
});