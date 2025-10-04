import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("ping")
  getPing() {
    return {
      message:
        "This message was delievered to the front end",
    };
  }

  @Get("hello")
  hello() {
    return { message: "hello world" };
  }
}
