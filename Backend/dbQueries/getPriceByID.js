const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getPriceById(pname) {
    //fetch the results from the prisma db and jsonify and send it to index.js
    try {
      const result = await prisma.pricing.findUnique({
      where: {
        pl_name: pname,
      },
    });
    return JSON.stringify(result);
  }
  catch (error) {
    console.log(error);
    return { error: 'Error retreiving plant data' };
  }
}

module.exports = getPriceById;