# Solutions

We are going to implement two solutions for writing and reading the id - address table.

## First Solution

In the first solution, we save our data in a plain text file (.csv). We read and write data to this file in two forms
* using the `fs` core node module;
* using the `node-fetch` node module.

## Second Solution

In the second solution, we use a MongoDB database to store the data. That is certainly an overkill, since a SQLite database would be more than sufficient. We use the mongoose module for connecting to the database and to read and write data.
