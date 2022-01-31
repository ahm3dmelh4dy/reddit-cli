#!/usr/bin/env node
import fetch from 'node-fetch';
import open from 'open';
import yargs from 'yargs';
import clipboard from 'clipboardy';
import chalk from 'chalk';

const { argv } = yargs(process.argv);

const REDDIT_URL = 'https://reddit.com';

const res = await fetch(`${REDDIT_URL}/.json`);
const redditData = await res.json();
const children = redditData.data.children;
const randomPost = children[Math.floor(Math.random() * children.length)];
const redditLink = `${REDDIT_URL}${randomPost.data.permalink}`;

if (argv.print) {
    console.log({
        title: randomPost.data.title,
        link: redditLink,
    });
    try {
        await clipboard.write(redditLink);
        console.log(chalk.green('The URL has been written to the clipboard!'));
    } catch (e) {
        console.error(chalk.red(e));
    }
} else {
    try {
        await open(redditLink);
    } catch (e) {
        console.error(chalk.red(e));
    }
}
