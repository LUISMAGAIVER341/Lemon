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
// Cria um gradiente de azul para vermelho



// function setupAliases() {
//     const modulesPath = "./modules";
//     const modules = fs.readdirSync(modulesPath);
//     modules.forEach(module => {
//         moduleAlias.addAlias(module, `${modulesPath}/${module}`);
//     });
// }


const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('No arguments provided');
}
if (args[0] === "init") {
    console.log(gradienteAzulVermelho("Lemon, the simplest way to create fast and scalable web applications"));
    console.log(YELLOW('Initializing project'));
    const a = await prompts({
        type: 'text',
        name: 'prjtname',
        message: 'What is your project name?',
        initial: 'lemon-project'
    });
    const b = a.prjtname;
    
    const git = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Do you want to initialize a git repository?',
        initial: false
    });
    const resGit = git.value;
    if (resGit == true) {
        console.log(gitgrad('Initializing git repository'));
        try {
            await $`git init`;
        } catch (error) {
            console.error("Error initializing git repository! Probably git is not installed on your machine.");
            const gitnfound = await prompts({
                type: 'confirm',
                name: 'gitnfnd',
                message: 'Do you want to see the error?',
                initial: false
            });
            if (gitnfound.gitnfnd == true) {
                console.error(error);
            }
        }
    }
    const authorname = await prompts({
        type: 'text',
        name: 'author',
        message: 'What is the author name?',
        initial: 'John Doe'
    })
    const version = await prompts({
        type: 'text',
        name: 'version',
        message: 'What is the version of the project?',
        initial: '1.0.0'
    })
    const gitlink = await prompts({
        type: 'text',
        name: 'gitlink',
        message: 'What is the link of the git repository?',
        initial: 'https://git.acme.net/lemon-project.git'
    })
    const entrypoint = await prompts({
        type: 'text',
        name: 'entrypoint',
        message: 'What is the entrypoint of the project?',
        initial: 'index.ts'
    });
    const author = authorname.author;
    const versionof = version.version;
    console.log(YELLOW('Creating project structure'));
    try {
        let project = {
            name: b,
            author: author,
            version: versionof,
            modules: [],
            entrypoint: entrypoint.entrypoint,
            gitURL: gitlink.gitlink
        }
        await $`echo ${JSON.stringify(project)} > lemon.json`;
    } catch (error) {
        console.log(redblue('Error creating project structure!'));
        console.error(error);
        
    }
    console.log(YELLOW('Project initialized!'));
}
if (args[0] === "add") {
    if (!args[1]) {
        console.log(redonly('No module name provided!'));
        process.exit(1);
    };
    console.log(redblue('Adding module: ' + args[1]));
    if (fs.existsSync("./modules") == false){
        console.log(gitgrad('Creating modules directory'));
        await $`mkdir modules`;
    }
    let stringprjt = JSON.stringify(prjct);
    let parsed = JSON.parse(stringprjt);
    let modules = parsed.modules;
    modules.push(args[1]);
    await $`echo ${JSON.stringify(parsed)} > lemon.json`;
    
    
    
    
}
if (args[0] === "exec"){
    
        try {
            require(args[1]);
        } catch (error) {
            console.log(redonly('Oops! It seems that the file you are trying to execute does not exist!'));
            const showerror = await prompts({
                type: 'confirm',
                name: 'showerror',
                message: 'Do you want to see the error?',
                initial: false
            })
            if (showerror.showerror == true) {
                console.error(error);
                let abu = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))).message;
                const google = "https://google.com/search?q=" + JSON.stringify(abu).replace(/ /g, '%20');
                console.log(chalk.red('Error executing file! Check the following link for some information: ' + gradienteAzulVermelho(google)));
            }
        }
    };
    

