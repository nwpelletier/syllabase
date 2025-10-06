import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("ping")
  ping() {
    return {
      message:
        "This message was delivered to the front end",
    };
  }

  @Get("hello")
  hello() {
    return { message: "Hello from Nest.js backend!" };
  }
}
