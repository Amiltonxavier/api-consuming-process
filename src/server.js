import { fastify } from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from '@fastify/cors'

const app = fastify();

const prisma = new PrismaClient();

app.register(cors, { 
    origin: true,
  })

app.get("/guiche/all", async (request, reply) => {
  const process = await prisma.process.findMany();
  return process;
});

app.get("/guiche/:id", async (request, reply) => {
  const { id } = request.params;
  try {
    const process = await prisma.process.findUnique({
      where: {
        id: Number(id),
      },
    });
    return process;
  } catch (err) {
    console.log(err);
  }
});
app.get("/guiche/getAllByStatus/:status", async (request, reply) => {
  const { status } = request.params;
  try {
    const process = await prisma.process.findMany({
      where: {
        status: parseInt(status),
      },
    });
    return process;
  } catch (err) {
    console.log(err);
  }
});

app.post("/guiche/status", async (request, reply) => {
    const { status } = request.body;
    try {
      const process = await prisma.process.findMany({
        where: {
          status: status,
        },
      });
      return process;
    } catch (err) {
      console.log(err);
    }
  });


app.put("/guiche/update-status/:id", async (request, reply) => {
  const { id } = request.params;
  const { status } = request.body;
  console.log(status)
  try {
    const process = await prisma.process.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });
    return process;
  } catch (err) {
    console.log(err);
  }
});

app.post("/guiche/create-request", async (request, reply) => {
  const {
    name,
    surname,
    purposeOfRequest,
    mailingAddress,
    dataStart,
    responsible,
  } = request.body;

  try {
    const process = await prisma.process.create({
      data: {
        name,
        surname,
        purposeOfRequest,
        mailingAddress,
        dataStart,
        Responsible: responsible,
        status: 0,
      },
      
    });
    return process;
  } catch (err) {
    console.log(err);
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3000 }, console.log("localhost:3000"));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
