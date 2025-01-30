const gradienteAzulVermelho = gradient(["yellow", "orange"]);
const YELLOW = gradient(["yellow", "yellow"]);
const gitgrad = gradient(["red", "green", "blue", "yellow",]);
const redonly = gradient(["red", "#e0584f"]);
const redblue = gradient(["red", "blue"]);
import path from 'path';

import fs from "fs";
import moduleAlias from "module-alias";
import { log } from "console";
import { $ } from "bun";
import gradient from "gradient-string";
import prompts from "prompts";
import 'module-alias/register'
import chalk from "chalk";

let prjct: any;

const existProject = fs.existsSync("./lemon.json");
switch (existProject) {
    case true:
        prjct = JSON.parse(fs.readFileSync("./lemon.json", "utf-8"));
        break;
    case false:
        console.log(redonly('No project found!'));
        $`lemon init`
        break;
}
