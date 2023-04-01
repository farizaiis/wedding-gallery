module.exports = {
    challenge: async (req, res) => {
        try {
            const number = req.query.number ? req.query.number : 0

            let data = [];

            for (let i = 1; i <= number; i++) {
                let temp = [];

                for (let j = 1; j <= number; j++) {
                    temp.push(i * j);
                }

                data.push(temp);
            }
          
            return res.status(200).json({
                status: 'success',
                message: 'Success generate number',
                data: data
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
      }
}