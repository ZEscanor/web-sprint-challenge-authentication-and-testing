const { default: expectCt } = require("helmet/dist/middlewares/expect-ct")
const { intersect } = require("../database/dbConfig")


const {joes} = require("./jokes-router")

describe('hello', ()=>{
it("sanity check", ()=>{
  expect(2+3).toBe(5)
})
})