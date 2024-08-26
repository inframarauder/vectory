import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import connect from "./utils/connect";
import Logger from "./utils/logger";
import errorHandler from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import api from "./routes";

// Create express app :
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Request logging :
app.use(requestLogger);

// root route :
app.get("/", (req: Request, res: Response) => {
	return res.sendStatus(200);
});

// api routes :
app.use("/api", api);

// error handler :
app.use(errorHandler);

// Start server :
app.listen(config.server.port, () => {
	Logger.info(`Server started on port ${ config.server.port }`);

	// connect to mongo database :
	connect.mongodb(config.mongo.uri);

	//connect to chromadb : 
	connect.chromadb(config.chromadb.url)
});
