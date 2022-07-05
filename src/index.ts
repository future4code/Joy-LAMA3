import { app } from "./server";

import { routes }  from "./routes/routes";

app.use("/user", routes);