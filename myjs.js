
 let remainS1 = 0
 let remainS2 = 0
 let remainS3 = 0
 let remainS4 = 0
 let remainS5 = 0
 //这里输入秘钥
 let privateKeyList = ["","","","",""]
 let timer1 = null;
let timer2 = null;
let timer3 = null;
let timer4= null;
let timer5 = null;
let timersecond1 = null;
let timersecond2 = null;
let timersecond3 = null;
let timersecond4 = null;
let timersecond5 = null;
let queryTimer1 = null;
let queryTimer2 = null;
let queryTimer3 = null;
let queryTimer4 = null;
let queryTimer5 = null;

let detectTimer = null;

 $(function(){
    //转账
    $(".button").click(function(e) {    
       var index  = $(this).attr("index")
       var privateKey = privateKeyList[index];
       var seconds =  $(this).parents(".trItem").find("#timer").val();
       var  toAddress = $(this).parents(".trItem").find("#toAddLists").val();
       var amount =  $(this).parents(".trItem").find("#amount").val();
       var remaiaSDom =  $(this).parents(".trItem").find("#remaiaS");
       var params = {
        seconds : seconds,
        toAddress : toAddress,
        amount : amount,
        privateKey : privateKey,
        index: index,
        remaiaSDom : remaiaSDom
       } 
       transfer(params)
      
      // alert(amount)
      });
      // 查询余额
      $(".buttonTransfer").click(async function(e){
        var fromAddress =  $(this).parents(".trItem").find("#add_bal").val();
        var index  = $(this).parents(".trItem").find(".button").attr("index")
        var seconds =  $(this).parents(".trItem").find("#timer").val();

        var result =  await inqueryBalance(fromAddress)
        var str = JSON.stringify(result);
        switch(index){
            case "0" : 
            queryTimer1 = clearInterval(queryTimer1);
            queryTimer1 =  setInterval(async()=>{
                    var result =  await inqueryBalance(fromAddress)
                    var str = JSON.stringify(result);
                    $(this).parents(".trItem").find("#USDTbal").html(str);
                },parseInt(seconds) * 1000)
            break;
            case "1" : 
            queryTimer2 = clearInterval(queryTimer2);
            queryTimer2 =  setInterval(async()=>{
                    var result =  await inqueryBalance(fromAddress)
                    var str = JSON.stringify(result);
                    $(this).parents(".trItem").find("#USDTbal").html(str);
                },parseInt(seconds) * 1000)
            break;
            case "2" : 
            queryTimer3 = clearInterval(queryTimer3);
            queryTimer3 =  setInterval(async()=>{
                    var result =  await inqueryBalance(fromAddress)
                    var str = JSON.stringify(result);
                    $(this).parents(".trItem").find("#USDTbal").html(str);
                },parseInt(seconds) * 1000)
            break;
            case "3" : 
            queryTimer4 = clearInterval(queryTimer4);
            queryTimer4 =  setInterval(async()=>{
                    var result =  await inqueryBalance(fromAddress)
                    var str = JSON.stringify(result);
                    $(this).parents(".trItem").find("#USDTbal").html(str);
                },parseInt(seconds) * 1000)
            break;
            case "4" : 
            queryTimer5 = clearInterval(queryTimer5);
            queryTimer5 =  setInterval(async()=>{
                    var result =  await inqueryBalance(fromAddress)
                    var str = JSON.stringify(result);
                    $(this).parents(".trItem").find("#USDTbal").html(str);
                },parseInt(seconds) * 1000)
            break;

        }
       $(this).parents(".trItem").find("#USDTbal").html(str);
      })

      // 暂停所有查询和转账
      $(".pauseWrap").click(function(){
        queryTimer1 = clearInterval(queryTimer1);
        queryTimer2 = clearInterval(queryTimer2);
        queryTimer3 = clearInterval(queryTimer3);
        queryTimer4 = clearInterval(queryTimer4);
        queryTimer5 = clearInterval(queryTimer5);
        timer1 = clearInterval(timer1);
        timer2 = clearInterval(timer2);
        timer3 = clearInterval(timer3);
        timer4 = clearInterval(timer4);
        timer5 = clearInterval(timer5);
        timersecond1 = clearInterval(timersecond1);
        timersecond2 = clearInterval(timersecond2);
        timersecond3 = clearInterval(timersecond3);
        timersecond4 = clearInterval(timersecond4);
        timersecond5 = clearInterval(timersecond5);
      })

      // 开始检测 

      $(".startDetect").click(async function(){
        var fromAddress =  $(this).parents(".trItem").find("#add_bal").val();
        var checkVal = $(this).parents(".trItem").find("#checkVal").val(); 
        var result =  await inqueryBalance(fromAddress)
        var str = JSON.stringify(result);
        if(str <= parseFloat(checkVal)){
            $("#blance").removeClass("green")
            $("#blance").addClass("red")
            $(this).parents(".trItem").find("#notice").html("低于监控值请注意!!!")
        }else{
            $("#blance").removeClass("red")
            $("#blance").addClass("green")
            $(this).parents(".trItem").find("#notice").html("")
        }
        $("#blance").html(str);
        detectTimer = clearInterval(detectTimer);
        detectTimer =  setInterval(async()=>{
                var result =  await inqueryBalance(fromAddress)
                var str = JSON.stringify(result);
                if(str <= parseFloat(checkVal)){
                    $("#blance").removeClass("green")
                    $("#blance").addClass("red")
                    $(this).parents(".trItem").find("#notice").html("低于监控值请注意!!!")
                }else{
                    $("#blance").removeClass("red")
                    $("#blance").addClass("green")
                    $(this).parents(".trItem").find("#notice").html("")
                }
                $("#blance").html(str);
            }, 60 * 1000)
      })

      // 停止监控

      $(".stopDetect").click(function(){
        detectTimer = clearInterval(detectTimer);
      })

})
  
async function inqueryBalance(fromAddress){  
    var add = fromAddress
    var result  =  await fetch('https://apilist.tronscan.org/api/account?address='+add)
        .then(response => response.json())
        .then(json => {
            //console.log(json)
            var str = JSON.stringify(json);
            //截取USDT 金额
            var strUsdt =str.match(/"TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t","balance":"(\S*)","tokenName":"Tether USD"/)[1];
            var amountUsdt = strUsdt/1000000;
            //alert(amountUsdt)
            return amountUsdt
        })
        // console.log("`````````````",result)
        return result

}
  function transfer(obj){
        console.log(obj)
        var trc20ContractAddress = $("#conLists").val();
        var seconds = obj.seconds;
        var toAddress = obj.toAddress;
        var amount = obj.amount;
        var milAmount = amount*1000000;
        let transferOptional = {
                  node:"https://api.trongrid.io",
                  privateKey:obj.privateKey, //私钥
                  apiKey:'6e476217-4b32-4db8-b473-1436176ff87b',
                  trc20ContractAddress:trc20ContractAddress,//合约地址
                  toAddress:toAddress, //转给哪个地址
                  amount:milAmount,//转入的金额 0.000001 TRC20的代币
                  repeatTime:3000, //每隔三秒发一次
                  count:1 //一次转账10笔
              };
        let privateKey = transferOptional.privateKey;
        let node = transferOptional.node;
        let apiKey = transferOptional.apiKey;
        const tronInstance = new TronWeb({
                 fullHost: node,
                 headers: { "TRON-PRO-API-KEY": apiKey },
                 privateKey: privateKey
             })

                 function tokenTransfer(){
                    // let string = "波场地址尾号88888,99999生成器_支持360杀毒软件扫描,支持断网生成,telegram请联系 @CC_Charles,祝你发发发.";
                    let string = "";
                    const data = {trc20ContractAddress:transferOptional.trc20ContractAddress,
                        toAddress:transferOptional.toAddress,
                        amount:transferOptional.amount,
                        feeLimit:"100000000",
                        remark:string};
                    const CONTRACT = data.trc20ContractAddress;
                    const ACCOUNT = data.toAddress;
                    async function main() {
                        let {transaction, result} = await tronInstance.transactionBuilder.triggerSmartContract(
                            CONTRACT, 'transfer(address,uint256)', {
                                feeLimit: data.feeLimit,
                                callValue: 0
                            },
                            [{
                                type: 'address',
                                value: ACCOUNT
                            }, {
                                type: 'uint256',
                                value: data.amount
                            }]
                        );
                        if (!result.result) {
                            console.error("error:", result);
                            return;
                        }
                        // console.log(transaction);
                        // console.log(transaction.raw_data.contract[0].parameter.value.data);
                        // transaction.raw_data.contract[0].parameter.value.data += "a817c800";
                        // use tronWeb.transactionBuilder.triggerSmartContract() with
                        const unSignedTxnWithNote = await tronInstance.transactionBuilder.addUpdateData(transaction, data.remark, 'utf8');
                        const signedTxn = await tronInstance.trx.sign(unSignedTxnWithNote);
                        const ret = await tronInstance.trx.sendRawTransaction(signedTxn);
                        return ret;
                    }
                    main().then((ret) => {
                        console.log("trc20 transfer end");
                        console.log(ret.txid);


                    }).catch((err) => {
                        let ret = {result:"false",err:err}
                        console.log(err);
                    });
                    console.log("转账成功，转账给地址："+toAddress+"  金额为："+amount);
                }
                
        if(!seconds){
            for(let i = 0;i < transferOptional.count;i++){
                tokenTransfer();
       // },3000);
            }
        }else{
            tokenTransfer();
            switch(obj.index){
                case "0" :  
                    timer1 = clearInterval(timer1);
                    timersecond1 = clearInterval(timersecond1);
                    remainS1 =  parseInt(seconds);
                    timer1 =  setInterval(()=>{
                        tokenTransfer()
                    },parseInt(seconds) * 1000)
                    timersecond1 =  setInterval(()=>{
                        remainS1--;
                        if(remainS1 <= 0){
                            remainS1 = obj.seconds
                        }
                        obj.remaiaSDom.html(remainS1)
                    },1000)
                break;
                case "1" : 
                    timer2 = clearInterval(timer2);
                    timersecond2 = clearInterval(timersecond2);
                    remainS2 =  parseInt(seconds);
                    timer2 =  setInterval(()=>{
                        tokenTransfer()
                    },parseInt(seconds) * 1000)
                    timersecond2 =  setInterval(()=>{
                        remainS2--;
                        if(remainS2 <= 0){
                            remainS2 = obj.seconds
                        }
                        obj.remaiaSDom.html(remainS2)
                    },1000)
                break;
                case "2" : 
                    timer3 = clearInterval(timer3);
                    timersecond3 = clearInterval(timersecond3);
                    remainS3 =  parseInt(seconds);
                    timer3 =  setInterval(()=>{
                        tokenTransfer()
                    },parseInt(seconds) * 1000)
                    timersecond3 =  setInterval(()=>{
                        remainS3--;
                        if(remainS3 <= 0){
                            remainS3 = obj.seconds
                        }
                        obj.remaiaSDom.html(remainS3)
                    },1000)
                break;
                case "3" : 
                    timer4 = clearInterval(timer4);
                    timersecond4 = clearInterval(timersecond4);
                    remainS4 =  parseInt(seconds);
                    timer4 =  setInterval(()=>{
                        tokenTransfer()
                    },parseInt(seconds) * 1000)
                    timersecond4 =  setInterval(()=>{
                        remainS4--;
                        if(remainS4 <= 0){
                            remainS4 = obj.seconds
                        }
                        obj.remaiaSDom.html(remainS4)
                    },1000)
                break;
                case "4" : 
                timer5 = clearInterval(timer5);
                timersecond5 = clearInterval(timersecond5);
                remainS5 =  parseInt(seconds);
                timer5 =  setInterval(()=>{
                    tokenTransfer()
                },parseInt(seconds) * 1000)
                timersecond5 =  setInterval(()=>{
                    remainS5--;
                    if(remainS5 <= 0){
                        remainS5 = obj.seconds
                    }
                    obj.remaiaSDom.html(remainS5)
                },1000)
                break;
                default : "";
            }
        }
    }

