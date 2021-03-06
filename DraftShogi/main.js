
var ctx;     //コンテキスト
var board = [];               //盤の配置
var member = [];               //各駒の配属
var movable = [];               //移動可能マス
var stand = [];                //持ち駒(種類と位置)リスト
var numstand = [];
var captble = [];              //持ち駒リスト

var mode = 0;      //0:初期 1:CPU???対局, 2:友達???対局, 3:CPU通常対局, 4:友達通常対局
var status = 0;      //0:通常　1:駒の選択状態
var turn;     //1:player1　-1:player2(CPU)
var bx,by;       //盤上の座標
var sbx,sby;     //選択状態の駒のbx,by
var ssx,ssy;     //選択状態の駒のsx,sy
var recentx,recenty
var winner;   //1:player1勝利　-1:player2勝利

var font_color = ["black","maroon","lime"];    //文字の色
var out_color = "olive";   //背景の色
var board_color = ["Khaki","darkkhaki","steelblue"];  //盤面の色
var line_color = ["darkslategray" ,"darkslategray" ,"darkslategray"];   //線の色
var stand_color = ["peru","saddlebrown"];  //駒台の色
var width = 440;   //画面の横幅
var height = 600;   //画面の縦幅

var psize = 40;           //1マスのピクセル数
var total_w = 11, total_h = 15;    //画面全体のマス数
var board_w = 5, board_h = 5;    //将棋盤のサイズ
var mw = (total_w-board_w)/2,   mh = (total_h-board_h)/2;  //将棋盤周りの余白マス数
var stand_w = 9, stand_h = 1;    //駒台のサイズ
var msw = 1, msh = 2;     //駒台周りの余白

function select(){
    console.log('select');

    fighter = [0,0,0,0,0,0,0,0,0,0];    //今回のゲームで使う駒のリスト([0～2]は空)
    ctx.font = " 30px 'ＭＳ ゴシック'"
        
    stand = [[0,0,0,0,0,0,0,0,0,0],        //持ち駒(格納位置:駒台の場所、値:駒id) 駒台内の位置
            [0,0,0,0,0,0,0,0,0,0]];
    numstand = [[0,1,0,0,0,0,0,0,0,0],        //持ち駒(格納位置:駒id、値:個数)　駒台内の内訳  王側[1]
                [0,0,1,0,0,0,0,0,0,0]];       //                                           玉側[2]
    turn = Math.floor(Math.random ()*2)*2 -1;   //手番をランダムで決定
    winner = 0;
    recentx = null;
    recenty = null;
    zyouseki_turn = 0;
    zyouseki_mode = turn + 2;
    draw_all_select();     //画面全体を描画

    numstand;

}

function prep(){    //準備モード(駒の選択&駒の配置)
/*
    //駒の選択
    list = [[0,0,0,1,1,1,0,1,0,0],      //王側[1]
    [0,0,0,0,1,1,0,0,1,2]];     //玉側[2]
    
    //駒の配置
    initLists = [[               //盤の初期配置
        [0,0,2,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,0,0]
    ],[               //各駒の初期配属
        [0,0,-1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,0,0]
    ]]

 //   gamestartFlag = 0;

    //action0を呼び出しまくろう
//    action0(x,y);
    //ゲームスタート
    draw_all_prep();
*/

//    numstand = draft()
//    initLists = boardPrep(numstand)
ctx.font = " 30px 'ＭＳ ゴシック'"
    
console.log('prep');

initLists = [[               //盤の初期配置
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
],[               //各駒の初期配属
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]]

board = initLists[0];
member = initLists[1];

movable = [            //移動可能マス
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];



stand = [[0,0,0,0,0,0,0,0,0,0],        //持ち駒(格納位置:駒台の場所、値:駒id) 駒台内の位置
         [0,0,0,0,0,0,0,0,0,0]];
/*         
numstand = [[0,1,0,2,1,0,0,0,0,0],        //持ち駒(格納位置:駒id、値:個数)　駒台内の内訳  王側[1]
            [0,0,0,0,0,5,0,2,0,0]];       //                                           玉側[2]
*/
turn = Math.floor(Math.random ()*2)*2 -1;   //手番をランダムで決定
winner = 0;
recentx = null;
recenty = null;
zyouseki_turn = 0;
zyouseki_mode = turn + 2;
draw_all_prep();     //画面全体を描画

}

//初期化処理
function init() {
//    numstand = draft()
//    initLists = boardPrep(numstand)
    ctx.font = " 30px 'ＭＳ ゴシック'"
/*
    initLists = [[               //盤の初期配置
        [4,0,2,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,0,0]
    ],[               //各駒の初期配属
        [-1,0,-1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,0,0]
    ]]

    board = initLists[0];
    member = initLists[1];
    
    movable = [            //移動可能マス
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];
    stand = [[0,0,0,0,0,0,0,0,0,0],        //持ち駒(格納位置:駒台の場所、値:駒id) 駒台内の位置
             [0,0,0,0,0,0,0,0,0,0]];
    numstand = [[0,0,0,0,0,0,0,0,0,0],        //持ち駒(格納位置:駒id、値:個数)　駒台内の内訳  王側[1]
                [0,0,0,0,0,0,0,0,0,0]];       //                                           玉側[2]

    turn = Math.floor(Math.random ()*2)*2 -1;   //手番をランダムで決定
    winner = 0;
    recentx = null;
    recenty = null;
    zyouseki_turn = 0;
    zyouseki_mode = turn + 2;
*/
    draw_all();     //画面全体を描画
}

/////////////////////////////////////描画処理/////////////////////////////////////////
//トップ画面描画
function draw_top(){
    status = 100;
    canvas = document.getElementById("world");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    var touch=false;
    if(navigator.userAgent.indexOf('iPhone') > 0    //使用デバイス判定
        || navigator.userAgent.indexOf('iPod') > 0
        || navigator.userAgent.indexOf('iPad') > 0
        || navigator.userAgent.indexOf('Android') > 0) {
         touch=true;
    }
    if(touch==true){
        document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});  //スクロール禁止
        document.addEventListener("touchstart", touchstart);  //タッチした瞬間に処理
    }else{
        document.addEventListener("mousedown", mousedown);   //マウス押した瞬間に処理
    }

    draw_out();  //背景描画
    ctx.font = "italic bold 50px 'HG正楷書体-PRO'";
    ctx.fillStyle = font_color[0];
    ctx.fillText("ただの将棋", mw*psize, mh*psize);
    //選択ボタン描画
    ctx.font = " 26px 'ＭＳ ゴシック'"
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(psize*1, height/2+psize*3, psize*(total_w-2), psize*1);  //枠内
    ctx.fillRect(psize*1, height/2+psize*5, psize*(total_w-2), psize*1);  //枠内
    ctx.fillStyle = "snow";
    ctx.fillText("通常対局(ぼっち)", psize*3+4, height/2+psize*3+30);
    ctx.fillText("通常対局(友達)", psize*3+18, height/2+psize*5+30);
    var img = new Image();
    img.onload = function onImageLoad() {
        ctx.drawImage(img, width/2-100, height/2-100, 200, 200);
    }
    img.src = "img/top.png";
}

//画面全体を描画
function draw_all(){
    status = 0;   //状態初期化
    draw_out();  //盤外
    ctx.fillStyle = line_color[0];    //駒台
    ctx.lineWidth = 3;
    ctx.strokeRect(psize*mw, psize*mh, psize*(board_w), psize*(board_h)); //枠線
    for(by=0; by<board_h; by++){    //盤内
        for(bx=0; bx<board_w; bx++){
            id = board[by][bx];
            m = member[by][bx];
            movable[by][bx] = 0;
            if(bx==recentx&&by==recenty){    //直近に差された駒
                draw_board(bx,by,id,m,1);
            }else{
                draw_board(bx,by,id,m,0);
            }
        }
    }
    ctx.fillStyle = line_color[0];    //駒台
    ctx.lineWidth = 3;
    ctx.strokeRect(psize*msw, psize*msh, psize*(stand_w), psize*(stand_h)); //枠線
    ctx.strokeRect(psize*(total_w-stand_w-msw), psize*(total_h-stand_h-msh), psize*(stand_w), psize*(stand_h));
    ctx.fillStyle = stand_color[0];
    ctx.fillRect(psize*msw+1, psize*msh+1, psize*(stand_w)-2, psize*(stand_h)-2);  //枠内
    ctx.fillRect(psize*(total_w-stand_w-msw)+1, psize*(total_h-stand_h-msh)+1, psize*(stand_w)-2, psize*(stand_h)-2);
    set_stand();  //stand配列を更新
    for(sy=stand_h-1; 0<=sy; sy--){
        for(sx=stand_w-1; 0<=sx; sx--){
            id = stand[0][stand_w*sy+sx];
            id2 = stand[1][stand_w*sy+sx];
            draw_stand(sx,sy,id,1,0);
        }
    }
    for(sy=0; sy<stand_h; sy++){
        for(sx=0; sx<stand_w; sx++){
            id = stand[0][stand_w*sy+sx];
            id2 = stand[1][stand_w*sy+sx];
            draw_stand(sx,sy,id2,-1,0);

            if(id==1 || id==2) winner=1;  //勝敗判定
            if(id2==1 || id2==2) winner=-1;
        }
    }

    if(winner == 1){
        ctx.fillStyle = "maroon";    //手番の表示
        ctx.fillText("勝利",psize/2,total_h*psize-12);
        ctx.fillStyle = "black";    //手番の表示
        ctx.fillText("敗北",psize/2,psize);
        if(mode==1||mode==3) setTimeout("alert('あなたの勝利です！')",100);
        turn = 0;
    }else if(winner == -1){
        ctx.fillStyle = "maroon";    //手番の表示
        ctx.fillText("勝利",psize/2,psize);
        ctx.fillStyle = "black";    //手番の表示
        ctx.fillText("敗北",psize/2,total_h*psize-12);
        if(mode==1||mode==3) setTimeout("alert('あなたの負けです…')",100);
        turn = 0;
    }

    ctx.fillStyle = "black";    //手番の表示
    if(turn==1){
        ctx.fillText("手番",psize/2,total_h*psize-12);
    }else if(turn==-1){
        ctx.fillText("手番",psize/2,psize);
    }

    if(turn==-1 && (mode==1 || mode==3)){
        action2();    //CPUの手番
    }
}

function draw_all_select(){
    status = 0;   //状態初期化
    draw_out();  //盤外


    ctx.fillStyle = line_color[0];    //駒台
    ctx.lineWidth = 3;
    ctx.strokeRect(psize*msw, psize*msh, psize*(stand_w), psize*(stand_h)); //枠線
    ctx.strokeRect(psize*(total_w-stand_w-msw), psize*(total_h-stand_h-msh), psize*(stand_w), psize*(stand_h));
    ctx.fillStyle = stand_color[0];
    ctx.fillRect(psize*msw+1, psize*msh+1, psize*(stand_w)-2, psize*(stand_h)-2);  //枠内
    ctx.fillRect(psize*(total_w-stand_w-msw)+1, psize*(total_h-stand_h-msh)+1, psize*(stand_w)-2, psize*(stand_h)-2);
    set_stand();  //stand配列を更新
    
    for(sy=stand_h-1; 0<=sy; sy--){
        for(sx=stand_w-1; 0<=sx; sx--){
            id = stand[0][stand_w*sy+sx];
            id2 = stand[1][stand_w*sy+sx];
            draw_stand(sx,sy,id,1,0);
        }
    }
    /*
    for(sy=0; sy<stand_h; sy++){
        for(sx=0; sx<stand_w; sx++){
            id = stand[0][stand_w*sy+sx];
            id2 = stand[1][stand_w*sy+sx];
            draw_stand(sx,sy,id2,-1,0);

            if(id==1 || id==2) winner=1;  //勝敗判定
            if(id2==1 || id2==2) winner=-1;
        }
    }
    */

    //決定ボタン描画
    ctx.font = " 26px 'ＭＳ ゴシック'"
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(psize*1, height/2+psize*3, psize*(total_w-2), psize*1);  //枠内
//    ctx.fillRect(psize*1, height/2+psize*5, psize*(total_w-2), psize*1);  //枠内
    ctx.fillStyle = "snow";
    ctx.fillText("これでコマ決定！", psize*3+4, height/2+psize*3+30);
//    ctx.fillText("通常対局(友達)", psize*3+18, height/2+psize*5+30);

    ctx.fillStyle = "black";    //手番の表示
    if(turn==1){
        ctx.fillText("手番",psize/2,total_h*psize-12);
    }else if(turn==-1){
        ctx.fillText("手番",psize/2,psize);
    }

    if(turn==-1 && (mode==1 || mode==3)){
        action2();    //CPUの手番
    }
}

function draw_all_prep(){   //ゲーム開始の駒並べ
    status = 0;   //状態初期化
    draw_out();  //盤外
    ctx.fillStyle = line_color[0];    //駒台
    ctx.lineWidth = 3;
    ctx.strokeRect(psize*mw, psize*mh, psize*(board_w), psize*(board_h)); //枠線
    for(by=0; by<board_h; by++){    //盤内
        for(bx=0; bx<board_w; bx++){
            id = board[by][bx];
            m = member[by][bx];
            movable[by][bx] = 0;
            if(bx==recentx&&by==recenty){    //直近に差された駒
                draw_board(bx,by,id,m,1);
            }else{
                draw_board(bx,by,id,m,0);
            }
        }
    }
    ctx.fillStyle = line_color[0];    //駒台
    ctx.lineWidth = 3;
    ctx.strokeRect(psize*msw, psize*msh, psize*(stand_w), psize*(stand_h)); //枠線
    ctx.strokeRect(psize*(total_w-stand_w-msw), psize*(total_h-stand_h-msh), psize*(stand_w), psize*(stand_h));
    ctx.fillStyle = stand_color[0];
    ctx.fillRect(psize*msw+1, psize*msh+1, psize*(stand_w)-2, psize*(stand_h)-2);  //枠内
    ctx.fillRect(psize*(total_w-stand_w-msw)+1, psize*(total_h-stand_h-msh)+1, psize*(stand_w)-2, psize*(stand_h)-2);
    set_stand();  //stand配列を更新
    for(sy=stand_h-1; 0<=sy; sy--){
        for(sx=stand_w-1; 0<=sx; sx--){
            id = stand[0][stand_w*sy+sx];
            id2 = stand[1][stand_w*sy+sx];
            draw_stand(sx,sy,id,1,0);
        }
    }
    for(sy=0; sy<stand_h; sy++){
        for(sx=0; sx<stand_w; sx++){
            id = stand[0][stand_w*sy+sx];
            id2 = stand[1][stand_w*sy+sx];
            draw_stand(sx,sy,id2,-1,0);

            if(id==1 || id==2) winner=1;  //勝敗判定
            if(id2==1 || id2==2) winner=-1;
        }
    }

/*
    if(winner == 1){
        ctx.fillStyle = "maroon";    //手番の表示
        ctx.fillText("勝利",psize/2,total_h*psize-12);
        ctx.fillStyle = "black";    //手番の表示
        ctx.fillText("敗北",psize/2,psize);
        if(mode==1||mode==3) setTimeout("alert('あなたの勝利です！')",100);
        turn = 0;
    }else if(winner == -1){
        ctx.fillStyle = "maroon";    //手番の表示
        ctx.fillText("勝利",psize/2,psize);
        ctx.fillStyle = "black";    //手番の表示
        ctx.fillText("敗北",psize/2,total_h*psize-12);
        if(mode==1||mode==3) setTimeout("alert('あなたの負けです…')",100);
        turn = 0;
    }
*/

    //決定ボタン描画
    ctx.font = " 26px 'ＭＳ ゴシック'"
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(psize*1, height/2+psize*3, psize*(total_w-2), psize*1);  //枠内
//    ctx.fillRect(psize*1, height/2+psize*5, psize*(total_w-2), psize*1);  //枠内
    ctx.fillStyle = "snow";
    ctx.fillText("これで決定！", psize*3+4, height/2+psize*3+30);
//    ctx.fillText("通常対局(友達)", psize*3+18, height/2+psize*5+30);

    ctx.fillStyle = "black";    //手番の表示
    if(turn==1){
        ctx.fillText("手番",psize/2,total_h*psize-12);
    }else if(turn==-1){
        ctx.fillText("手番",psize/2,psize);
    }

    if(turn==-1 && (mode==1 || mode==3)){
        action2();    //CPUの手番
    }
}

//盤内を描画
function draw_board(bx,by,id,m,color){
    px = (bx+mw)*psize;
    py = (by+mh)*psize;
    ctx.fillStyle = line_color[color];
    ctx.fillRect(px, py, psize, psize);  //枠線描画
    ctx.fillStyle = board_color[color];
    ctx.fillRect(px+1, py+1, psize-2, psize-2);  //盤面描画
    if(0<id){   //駒描画
        if(id<10){
            ctx.fillStyle = font_color[0];
        }else{
            ctx.fillStyle = font_color[1];
        }
        if(m==1){
            ctx.fillText(nametbl[id],px+5,py+32);
        }else if(m==-1){
            px = -px-psize;
            py = -py-psize;
            ctx.rotate(Math.PI); //半回転
            ctx.fillText(nametbl[id],px+5,py+32);
            ctx.rotate(Math.PI); //半回転
        }
    }
}
//駒台を描画
function draw_stand(sx,sy,id,m,color){
    if(m==1){
        px = (total_w-msw-stand_w+sx)*psize;
        py = (total_h-msh-stand_h+sy)*psize;
    }else if(m==-1){
        px = (stand_w+msw-sx-1)*psize;
        py = (stand_h+msh-sy-1)*psize;
    }
    ctx.fillStyle = stand_color[color];
    ctx.fillRect(px+1, py+1, psize-2, psize-2);  //盤面描画
    if(0<id){   //駒描画
        if(m==1){
            ctx.fillStyle = font_color[0];
            ctx.fillText(nametbl[id],px+5,py+32);
            ctx.fillStyle = font_color[2];
            if(numstand[0][id]>1)  ctx.fillText(numstand[0][id],px+20,py+26);
        }else if(m==-1){
            px = -px-psize;
            py = -py-psize;
            ctx.rotate(Math.PI); //半回転
            ctx.fillStyle = font_color[0];
            ctx.fillText(nametbl[id],px+5,py+32);
            ctx.rotate(Math.PI); //半回転
            px *= (-1);
            py *= (-1);
            ctx.fillStyle = font_color[2];
            if(numstand[1][id]>1)  ctx.fillText(numstand[1][id],px-14,py);
        }
    }
}
//盤外を描画
function draw_out(x,y,color){
    px = x*psize;
    py = y*psize;
    ctx.fillStyle = out_color;
    ctx.fillRect(0, 0, psize*total_w, psize*total_h);  //盤面描画
}

function draw_stand_select(sx,sy,id,m,color){
    if(m==1){
        px = (total_w-msw-stand_w+sx)*psize;
        py = (total_h-msh-stand_h+sy)*psize;
    }else if(m==-1){
        px = (stand_w+msw-sx-1)*psize;
        py = (stand_h+msh-sy-1)*psize;
    }
    ctx.fillStyle = stand_color[color];
    ctx.fillRect(px+1, py+1, psize-2, psize-2);  //盤面描画
    if(0<id){   //駒描画
        if(m==1){
            ctx.fillStyle = font_color[0];
            ctx.fillText(nametbl[id],px+5,py+32);
            ctx.fillStyle = font_color[2];
            if(numstand[0][id]>1)  ctx.fillText(numstand[0][id],px+20,py+26);
        }else if(m==-1){
            px = -px-psize;
            py = -py-psize;
            ctx.rotate(Math.PI); //半回転
            ctx.fillStyle = font_color[0];
            ctx.fillText(nametbl[id],px+5,py+32);
            ctx.rotate(Math.PI); //半回転
            px *= (-1);
            py *= (-1);
            ctx.fillStyle = font_color[2];
            if(numstand[1][id]>1)  ctx.fillText(numstand[1][id],px-14,py);
        }
    }
}

///////////////////////////////////////////動作処理////////////////////////////////////////////////////
//タッチ処理(タブレット)
function touchstart(e){
    if (e.targetTouches.length == 1){
        var rect=e.target.getBoundingClientRect();  //canvas上の絶対座標(左上)
        var touch = e.targetTouches[0];
        var tx = touch.clientX - rect.left;
        var ty = touch.clientY - rect.top;
        var obj = document.getElementById("world");
        var rw = obj.getBoundingClientRect().width;    //現在のcanvasサイズ
        var rh = obj.getBoundingClientRect().height;
        tx = tx * width / rw;
        ty = ty * height / rh;
        masu_select(tx, ty);
    }
}
//クリック処理(PC)
function mousedown(e){
    var rect=e.target.getBoundingClientRect();  //canvas上の絶対座標(左上)
    var tx = e.clientX - rect.left;
    var ty = e.clientY - rect.top;
    masu_select(tx, ty);
}
 //クリック(タッチ)された座標にあるマス識別
function masu_select(tx,ty){
    if(mode==0){
        if(psize*1<tx && tx<psize*(total_w-2) && height/2<ty && ty<(height/2+psize)){
            //mode=1;  //???CPU通常対局
            //init();  //ゲーム開始
        }else if(psize*1<tx && tx<psize*(total_w-2) && height/2+psize*2<ty && ty<(height/2+psize*3)){
            //mode=2;  //???通常対局
            //init();  //ゲーム開始
        }else if(psize*1<tx && tx<psize*(total_w-2) && height/2+psize*3<ty && ty<(height/2+psize*5)){
            mode=6;  //CPU通常対局
            select();  //ゲーム開始
        }else if(psize*1<tx && tx<psize*(total_w-2) && height/2+psize*5<ty && ty<(height/2+psize*7)){
            mode=4;  //友達通常対局
            prep();  //ゲーム開始
        }else{
            return;
        }
        return;
    }
    x = Math.floor(tx/psize);   //floor:切り捨て
    y = Math.floor(ty/psize);

    if(mode==1 && turn==1) action1(x,y);
    if(mode==2) action1(x,y);
    if(mode==3 && turn==1) action1(x,y);
    if(mode==4) action1(x,y);

    if(mode==6){
        if(JSON.stringify(fighter) == JSON.stringify([0,0,0,0,0,0,0,0,0,0])){   //残り候補駒なし
            mode=5;
            prep();
        }else{

        }
    }

    if(mode==5){
        if(psize*1<tx && tx<psize*(total_w-2) && height/2+psize*3<ty && ty<(height/2+psize*4)){
            console.log(JSON.stringify(numstand[0]));
            console.log(JSON.stringify([0,0,0,0,0,0,0,0,0,0]));
            if (JSON.stringify(numstand[0]) == JSON.stringify([0,0,0,0,0,0,0,0,0,0])){        //持ち駒(格納位置:駒id、値:個数)　駒台内の内訳  王側[1]
                mode=3;
                init();
            }else{
                alert('駒は全て配置してください');
            }
        }else{
            action0(x,y);
        }
    }
}

function action1(x,y){    //人間
    if(isinside(x,y)){
        bx = x-mw;
        by = y-mh;
        if(status==0){
            sbx = bx;
            sby = by;
            movefrom(bx,by);
            return;
        }else if(status==1){
            if(movable[by][bx] == 1){  //移動可能な場合
                moveto(bx,by);
                turn *= -1;
            }
        }else if(status==2){
            if(movable[by][bx] == 1){  //移動可能な場合
                setto(bx,by);
                turn *= -1;
            }
        }
    }else if(isstand(x,y)){
        if(status==0){
            if(turn==1){
                ssx = x-(total_w-msw-stand_w);
                ssy = y-(total_h-msh-stand_h);
            }else if(turn==-1){
                ssx = msw+stand_w-x-1;
                ssy = msh+stand_h-y-1;
            }
            setfrom(ssx,ssy);
            return;
        }
    }
    draw_all();
}

function action0(x,y){    //人間
    if(isinside(x,y)){
        bx = x-mw;
        by = y-mh;
        if(status==0){
            sbx = bx;
            sby = by;
            movefrom(bx,by);
            return;
        }else if(status==1){
            if(movable[by][bx] == 1){  //移動可能な場合
                moveto(bx,by);
                //turn *= -1;
            }
        }else if(status==2){
            if(movable[by][bx] == 1){  //移動可能な場合
                setto(bx,by);
                //turn *= -1;
            }
        }
    }else if(isstand(x,y)){
        if(status==0){
            if(turn==1){
                ssx = x-(total_w-msw-stand_w);
                ssy = y-(total_h-msh-stand_h);
            }else if(turn==-1){
                ssx = msw+stand_w-x-1;
                ssy = msh+stand_h-y-1;
            }
            setfrom(ssx,ssy);
            return;
        }
    }
    draw_all_prep();
}

function action2(){   //CPUの手番
    CPUthink(CPUmove);
}
//動作処理
function CPUmove(){
    if(cpu[4]==0){
        sbx = cpu[0];
        sby = cpu[1];
        setTimeout("movefrom(sbx,sby)",100);
        setTimeout("moveto(cpu[2],cpu[3])",200);
    }else if(cpu[4]==1){
        ssx = cpu[0];
        ssy = cpu[1];
        setTimeout("setfrom(ssx,ssy)",100);
        setTimeout("setto(cpu[2],cpu[3])",200);
    }
    setTimeout("turn *= -1",300);
    setTimeout("draw_all()",400);
}
//////////////////////////////////////////////////////////////////////////////////
//リセット(初期化)
function doReset() {
    mode = 0;
    draw_top();
}

//ダブルタップによるズーム禁止
var t = 0;
document.documentElement.addEventListener('touchend', function (e) {
  var now = new Date().getTime();
  if ((now - t) < 500){
    e.preventDefault();
  }
  t = now;
}, false);
