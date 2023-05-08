import { Request, Response } from "express"
import { HttpResponse } from "./http"

export interface Controller {
  handle(request: Request, response: Response): Promise<Response>
}