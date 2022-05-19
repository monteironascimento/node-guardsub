var pm2 = require('pm2');

try {
  
    verificaProcesso();
 } catch (error) {
    console.log(error);    
}

async function verificaProcesso() {

    do{
        try {
            
            console.log("INICIANDO CONEXAO")
            await pm2.connect(function(err) {

                    pm2.list((err, list) => {
                    for (const key in list) {

                        if(list[key].name === 'crow' || list[key].name === 'database' 
                            || list[key].name === 'facboock' || list[key].name === 'lomadee' || list[key].name === 'orquestrador'
                            || list[key].name === 'telegram' || list[key].name === 'whatsapp' || list[key].name === 'woocommerce' 
                            || list[key].name === 'guard'){

                            if(list[key].pm2_env.status !== 'online'){
                                pm2.restart(list[key].name, (err, proc) => {
                                    console.log(`Servico reiniciado ${list[key].name}`)
                                })
                            }
                        }
                        
                    }
                })
            });
            //pm2.disconnect();
            await sleep(36000)
        } catch (error) {
                
        }

    }while(true)
}

async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
  