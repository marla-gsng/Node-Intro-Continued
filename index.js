import axios from "axios";
import "dotenv/config";
import http from "http";
import fs from "fs";

const host = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  fs.readFile("response.json", "utf-8", (err, data) => {
    if (err) throw err;

    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    // console.log(response); -- will show only in terminal
    fs.writeFileSync(
      "response.json",
      JSON.stringify(response.data),
      "utf-8",
      (err) => {
        if (err) throw err;
      }
    );
  } catch (error) {
    console.log(error);
  }
};
fetchUsers();
