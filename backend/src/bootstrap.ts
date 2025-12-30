import { App } from "./app";
import { createContainer } from "@di/container";
import { env } from "./config/env";
import { TYPES } from "@di/types";

export const bootstrap = async () => {

    const container = createContainer();

    const appService = container.get<App>(TYPES.App);
    await appService.init();

    appService.app.listen(env.PORT, () =>
        console.log(`Server Started on port ${env.PORT}`)
    );
};

