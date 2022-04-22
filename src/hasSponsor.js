import connection from "./database.js";
import fs from "fs";
import { Parser } from "json2csv";

const hasSponsorShip = true;

try {
  const { rows } = await connection.query(
    `SELECT FROM repositories WHERE "hasSponsorShip"=$1`,
    [hasSponsorShip]
  );
  const fileName = "sponsored-repos.json";
  const myJSON = JSON.stringify(rows);

  fs.writeFileSync(fileName, myJSON);
} catch (error) {
  console.log(error);
}

const fields = ["name", "owner", "description", "topic", "language", "stars"];
const options = { fields };

const parser = new Parser(options);
const csv = parser.parse(myJSON);
const csvFileName = "repos.csv";

fs.writeFileSync(csvFileName, csv);
