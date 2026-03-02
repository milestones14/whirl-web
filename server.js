import express from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());

app.post("/gen", (req, res) => {
    const args = req.body?.args ?? [];

    const p = spawn("./whirl", args);

    let out = "";
    let err = "";

    p.stdout.on("data", d => out += d.toString());
    p.stderr.on("data", d => err += d.toString());

    p.on("close", code => {
        res.json({
            exitCode: code,
            stdout: out,
            stderr: err
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on", port);
});