const { Client } = require("@elastic/elasticsearch");
const client = new Client({
    node: 'https://192.168.0.141:9200',
    auth: {
      username: 'elastic',
      password: 'HvYM=VJjiwIob8vN9yt8'
    },
    caFingerprint: '22:AE:FB:BF:2B:57:77:22:7A:0C:E6:9E:C8:12:00:7B:CB:23:DC:06:B9:2C:4E:8E:6A:A1:E5:8E:02:3E:C1:1E',
    tls: {
       // ca: fs.readFileSync('C:\Users\anju\Downloads\elasticsearch-8.8.2-windows-x86_64\elasticsearch-8.8.2\config\certs\http_ca.crt'),
        rejectUnauthorized: false
    }
  }) 
  async function run () {
   const countError = await client.count({
    index: 'winlogbeat-*',
    query: {
    match: {
      'log.level':'error'
    }
    }
  })
 /* const countWarning = await client.count({
    index: 'winlogbeat-*',
    query: {
    match: {
      'log.level':'warning'
    }
    }
  })
  const countinformation = await client.count({
    index: 'winlogbeat-*',
    query: {
    match: {
      'log.level':'information'
    }
    }
  })*/
  console.log(countError);
  //console.log(countWarning);
  //console.log(countinformation);*/
  /*const result = await client.msearch({
    searches: [
      { index: 'winlogbeat-*' },
      { query: { match: { 'log.level': 'error' } } },

      { index: 'winlogbeat-*' },
      { query: { match: { 'winlog.channel': 'System' } } }
    ]
  })*/

  //console.log(result.responses)
}
 
  
  run().catch(console.log);