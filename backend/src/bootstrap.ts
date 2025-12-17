import { App } from "./app";
import { createContainer } from "@di/container";
import { assertEnv, env } from "./config/env";
import { TYPES } from "@di/types";

export const bootstrap = async () => {
    // assertEnv(); // Optional: Validate env vars if needed

    const container = createContainer();

    // Resolve App from container
    const appService = container.get<App>(TYPES.App);
    await appService.init();

    appService.app.listen(env.PORT, () =>
        console.log(`Server Started on port ${env.PORT}`)
    );
};

