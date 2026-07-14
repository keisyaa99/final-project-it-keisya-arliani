var P=[
{id:1,name:"Donat",cat:"goreng",price:30000,desc:"Donat lembut mengembang sempurna dengan glaze lembut dan topping khas. Digoreng dengan minyak berkualitas tinggi. Fluffy di dalam, sedikit crispy di luar.",img:"donut/Chocolate Donuts.jpg",rating:4.8,reviews:312,badge:"best",isCake:false,hasRequest:false,est:"1-3 jam",flavors:[{name:"Coklat",img:"donut/Chocolate Donuts.jpg"},{name:"Strawberry",img:"donut/d strawberry.jpg"},{name:"Matcha",img:"donut/d matcha.jpg"},{name:"Kacang",img:"donut/d kacang.jpg"},{name:"Keju",img:"donut/d keju.jpg"}]},
{id:2,name:"Croissant",cat:"panggang",price:55000,desc:"Croissant premium dengan 36 lapisan adonan dan butter Eropa. Renyah di setiap gigitan pertama, kemudian lembut dan creamy di lidah.",img:"croissant/croissant 2.jpeg",rating:4.9,reviews:247,badge:null,isCake:false,hasRequest:false,est:"1-3 jam",flavors:[{name:"Butter",img:"croissant/butter.jpg"},{name:"Coklat",img:"croissant/coklat.jpg"},{name:"Strawberry",img:"croissant/strawberry.jpg"},{name:"Matcha",img:"croissant/matcha.jpg"},{name:"Pistachio",img:"croissant/Pistachio.jpg"}]},
{id:3,name:"Cake",cat:"panggang",price:165000,desc:"Kue lembut dengan filling dan ganache premium. Di-topping dengan buah segar, drip elegan, dan dekorasi cantik.",img:"cake/cake 2.jpeg",rating:4.9,reviews:189,badge:"best",isCake:true,hasRequest:true,est:"16 jam",flavors:[{name:"Vanilla",img:"cake/vanilla.jpg"},{name:"Coklat",img:"cake/chocolate cake.jpg"},{name:"Strawberry",img:"cake/strawberry.jpg"}]},
{id:4,name:"Cookies",cat:"panggang",price:60000,desc:"Cookies tebal dengan topping besar yang meleleh saat hangat. Adonan brown sugar memberikan warna golden. Chewy di tengah, crispy di tepi.",img:"cookies/cookies 2.jpeg",rating:4.7,reviews:278,badge:null,isCake:false,hasRequest:false,est:"1-3 jam",flavors:[{name:"Double Chocolate",img:"cookies/coklat.jpg"},{name:"Matcha",img:"cookies/matcha.jpg"},{name:"Red Velvet",img:"cookies/Red Velvet Cookies.jpg"},{name:"Cream Cheese",img:"cookies/crem cheese.jpg"},{name:"Bubble Gum",img:"cookies/buble gum.jpg"}]},
{id:5,name:"Cupcake",cat:"mini",price:37000,desc:"Cupcake dengan sponge lembut, swirled frosting cantik, dan topping spesial. Satu gigitan kecil, satu senyum besar.",img:"cupcake/cupcake.jpg",rating:4.6,reviews:195,badge:"new",isCake:false,hasRequest:false,est:"1-3 jam",flavors:[{name:"Strawberry",img:"cupcake/strawberry.jpg"},{name:"Oreo",img:"cupcake/Oreo.jpg"},{name:"Lotus",img:"cupcake/Lotus.jpg"},{name:"Coklat",img:"cupcake/coklat.jpg"},{name:"Blueberry",img:"cupcake/Blueberry.jpg"}]},
{id:6,name:"Fudgy Brownis",cat:"panggang",price:85000,desc:"Brownis super fudgy dengan rasio cokelat tinggi — crispy di permukaan, lembap dan dense di dalam. Dark chocolate couverture 70%.",img:"fudgy brownis/fudgy brownies.jpg",rating:4.8,reviews:223,badge:null,isCake:false,hasRequest:false,est:"1-3 jam",flavors:[]},
{id:7,name:"Macaron Box",cat:"mini",price:120000,desc:"Macaron Prancis otentik dengan shell renyah dan kaki sempurna. 6 pcs per box dengan filling lembut dan creamy. Warna pastel cantik.",img:"macaron/macaron.jpg",rating:4.7,reviews:164,badge:"new",isCake:false,hasRequest:false,est:"1-3 jam",flavors:[]},
{id:8,name:"Pie",cat:"panggang",price:105000,desc:"Pie dengan filling buah, topped dengan crumble buttery golden crispy. Crust renyah berbutter. Disajikan hangat.",img:"pie/pie.jpg",rating:4.6,reviews:141,badge:null,isCake:false,hasRequest:false,est:"1-3 jam",flavors:[{name:"Apple Pie",img:"pie/apple pie.jpg"},{name:"Cherry Pie",img:"pie/cherry pie.jpg"},{name:"Blueberry Pie",img:"pie/blueberry pie.jpg"},{name:"Cream Pie",img:"pie/creem.jpg"},{name:"Strawberry Pie",img:"pie/strawberry pie.jpg"}]}
];

var cart=JSON.parse(localStorage.getItem('rc_cart'))||[];
var orders=JSON.parse(localStorage.getItem('rc_orders'))||[];
var curCat='semua',curSearch='',mId=null,selFlavor='',reqDeco='',isReqDeco=false;
var WA='629518732906',ONGKIR=15000,BATAS=80000;

function rp(n){return'Rp'+n.toLocaleString('id-ID')}
function starsHtml(r,rv){var s='',f=Math.floor(r),h=r%1>=.5?1:0,e=5-f-h;for(var i=0;i<f;i++)s+='<i class="fas fa-star"></i>';if(h)s+='<i class="fas fa-star-half-stroke"></i>';for(var i=0;i<e;i++)s+='<i class="far fa-star"></i>';s+='<span>'+r+' ('+rv+')</span>';return s}
function toast(msg){var box=document.getElementById('toastBox'),t=document.createElement('div');t.className='toast';t.innerHTML='<i class="fas fa-check-circle"></i><span>'+msg+'</span>';box.appendChild(t);setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},3000)}
function saveCart(){localStorage.setItem('rc_cart',JSON.stringify(cart))}
function saveOrders(){localStorage.setItem('rc_orders',JSON.stringify(orders))}
function getSub(){var t=0;cart.forEach(function(c){t+=c.price*c.qty});return t}
function getOng(){return getSub()>BATAS?ONGKIR:0}
function getTot(){return getSub()+getOng()}

function renderGrid(){
  var grid=document.getElementById('pGrid');
  var list=P.filter(function(p){return(curCat==='semua'||p.cat===curCat)&&(!curSearch||p.name.toLowerCase().indexOf(curSearch.toLowerCase())>-1)});
  if(!list.length){grid.innerHTML='<div class="no-res"><i class="fas fa-search"></i><p>Tidak ada menu yang ditemukan</p></div>';return}
  var h='';
  list.forEach(function(p){
    var cc=p.cat==='goreng'||p.cat==='mini'?'cg':'cp';
    var bd=p.badge?'<span class="pc-badge '+p.badge+'">'+(p.badge==='best'?'Best Seller':'Baru')+'</span>':'';
    h+='<div class="pc">'+bd+'<div class="pc-img" onclick="openPM('+p.id+')"><img src="'+p.img+'" alt="'+p.name+'" loading="lazy"><div class="pc-ov"><button class="pc-ov-btn" onclick="event.stopPropagation();openPM('+p.id+')" aria-label="Lihat detail"><i class="fas fa-eye"></i></button></div></div><div class="pc-body"><div class="pc-cat '+cc+'">'+p.cat+'</div><div class="pc-name">'+p.name+'</div><div class="pc-stars">'+starsHtml(p.rating,p.reviews)+'</div><div class="pc-bot"><span class="pc-price">'+rp(p.price)+'</span><button class="pc-add" onclick="openPM('+p.id+')" aria-label="Tambah ke keranjang"><i class="fas fa-plus"></i></button></div></div></div>';
  });
  grid.innerHTML=h;
}

function openPM(id){
  var p=P.find(function(x){return x.id===id});if(!p)return;
  mId=id;selFlavor='';reqDeco='';isReqDeco=false;
  document.getElementById('mImg').src=p.img;document.getElementById('mImg').alt=p.name;
  var cc=p.cat==='goreng'||p.cat==='mini'?'cg':'cp';
  document.getElementById('mCat').className='pc-cat '+cc;document.getElementById('mCat').textContent=p.cat;
  document.getElementById('mName').textContent=p.name;document.getElementById('mStars').innerHTML=starsHtml(p.rating,p.reviews);
  document.getElementById('mDesc').textContent=p.desc;document.getElementById('mPrice').textContent=rp(p.price);
  document.getElementById('mQVal').value=1;
  var es=document.getElementById('estSec');es.className='est-sec'+(p.isCake?' cake-est':'');
  document.getElementById('estVal').textContent=p.est||'1-3 jam';
  var fs=document.getElementById('flavorSec'),fg=document.getElementById('flavorGrid'),rw=document.getElementById('reqWrap');
  if(p.flavors&&p.flavors.length){
    fs.style.display='block';var fh='';
    p.flavors.forEach(function(fl,i){fh+='<div class="fl-card'+(i===0?' on':'')+'" data-fl="'+fl.name+'" onclick="pickFl(this)"><img src="'+fl.img+'" alt="'+fl.name+'" loading="lazy"><div class="fl-label">'+fl.name+'</div><div class="fl-check"><i class="fas fa-check"></i></div></div>'});
    fg.innerHTML=fh;selFlavor=p.flavors[0].name;
    if(p.hasRequest){rw.innerHTML='<div class="fl-request" id="reqToggle" onclick="toggleReq()"><div class="req-radio"></div><span>Tambah catatan dekorasi / tulisan di kue</span></div><div class="req-detail" id="reqDetail"><textarea id="reqText" placeholder="Contoh: Tulis \'Happy Birthday Anisa\' di atas kue, warna pink..." oninput="reqDeco=this.value"></textarea></div>'}else{rw.innerHTML=''}
  }else{fs.style.display='none';rw.innerHTML='';selFlavor=''}
  updateAddBtn();document.getElementById('pModal').classList.add('open');document.body.style.overflow='hidden';
}
function closePM(){document.getElementById('pModal').classList.remove('open');document.body.style.overflow='';mId=null}
function pickFl(el){document.querySelectorAll('.fl-card').forEach(function(c){c.classList.remove('on')});el.classList.add('on');selFlavor=el.getAttribute('data-fl');updateAddBtn()}
function toggleReq(){var t=document.getElementById('reqToggle'),d=document.getElementById('reqDetail');isReqDeco=!isReqDeco;t.classList.toggle('on',isReqDeco);d.classList.toggle('show',isReqDeco);if(!isReqDeco){reqDeco='';var ta=document.getElementById('reqText');if(ta)ta.value=''}}
function updateAddBtn(){var btn=document.getElementById('mAddBtn'),p=P.find(function(x){return x.id===mId});if(!p){btn.disabled=true;return}var nf=p.flavors&&p.flavors.length>0,ok=nf?!!selFlavor:true;btn.disabled=!ok;btn.innerHTML=ok?'<i class="fas fa-bag-shopping"></i> Tambah ke Keranjang':'<i class="fas fa-bag-shopping"></i> Pilih rasa dulu'}
function mQtyChange(d){var i=document.getElementById('mQVal'),v=parseInt(i.value)||1;i.value=Math.max(1,Math.min(99,v+d))}
function mQtyInput(){var i=document.getElementById('mQVal'),v=parseInt(i.value)||1;i.value=Math.max(1,Math.min(99,v))}
function addToCartFromModal(){
  var p=P.find(function(x){return x.id===mId});if(!p)return;
  var q=parseInt(document.getElementById('mQVal').value)||1;
  var ex=cart.find(function(c){return c.id===p.id&&c.flavor===selFlavor&&c.note===(isReqDeco?reqDeco:'')});
  if(ex){ex.qty+=q}else{cart.push({id:p.id,name:p.name,price:p.price,img:p.img,flavor:selFlavor,note:isReqDeco?reqDeco:'',qty:q})}
  saveCart();renderCart();closePM();toast(p.name+' (x'+q+') masuk keranjang!');
}

function renderCart(){
  var list=document.getElementById('cList'),dot=document.getElementById('cartDot');
  var tq=0;cart.forEach(function(c){tq+=c.qty});dot.textContent=tq;dot.classList.toggle('show',tq>0);
  var sub=getSub(),ong=getOng(),tot=getTot();
  document.getElementById('cSub').textContent=rp(sub);
  var oe=document.getElementById('cOngkir');
  if(ong>0){oe.textContent=rp(ong);oe.style.color='var(--fg2)'}else{oe.innerHTML='<span style="color:var(--pink);font-weight:600">Gratis</span>';oe.style.color=''}
  document.getElementById('cTotal').textContent=rp(tot);
  document.getElementById('ckBtn').disabled=cart.length===0;
  if(!cart.length){list.innerHTML='<div class="c-empty"><i class="fas fa-bag-shopping"></i><p>Keranjang masih kosong</p></div>';return}
  var h='';
  cart.forEach(function(c,i){
    var fl=c.flavor?'<div class="ci-flavor"><i class="fas fa-circle"></i> Rasa: '+c.flavor+'</div>':'';
    var nt=c.note?'<div class="ci-note"><i class="fas fa-pen-fancy" style="margin-right:3px;font-size:.55rem"></i>'+c.note+'</div>':'';
    h+='<div class="ci"><div class="ci-img"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy"></div><div class="ci-body"><div class="ci-name">'+c.name+'</div>'+fl+nt+'<div class="ci-price">'+rp(c.price*c.qty)+'</div><div class="ci-row"><div class="ci-qty"><button onclick="cartQty('+i+',-1)" type="button"><i class="fas fa-minus"></i></button><span>'+c.qty+'</span><button onclick="cartQty('+i+',1)" type="button"><i class="fas fa-plus"></i></button></div><button class="ci-del" onclick="cartDel('+i+')"><i class="fas fa-trash-alt"></i> Hapus</button></div></div></div>';
  });
  list.innerHTML=h;
}
function cartQty(i,d){if(!cart[i])return;cart[i].qty+=d;if(cart[i].qty<1)cart[i].qty=1;if(cart[i].qty>99)cart[i].qty=99;saveCart();renderCart()}
function cartDel(i){var n=cart[i]?cart[i].name:'';cart.splice(i,1);saveCart();renderCart();toast(n+' dihapus dari keranjang')}
function openCart(){document.getElementById('cBg').classList.add('open');document.getElementById('cPanel').classList.add('open');document.body.style.overflow='hidden'}
function closeCart(){document.getElementById('cBg').classList.remove('open');document.getElementById('cPanel').classList.remove('open');document.body.style.overflow=''}

var selPay='',selEw='';
function pickPay(el){
  document.querySelectorAll('.pay-op').forEach(function(o){o.classList.remove('on')});
  el.classList.add('on');
  selPay=el.getAttribute('data-pay');
  document.querySelectorAll('.pay-sub').forEach(function(s){s.classList.remove('show')});
  var sub=document.getElementById('paySub_'+selPay);
  if(sub)sub.classList.add('show');
  if(selPay==='E-Wallet')selEw='';
}
function pickEw(el){
  document.querySelectorAll('.ew-opt').forEach(function(o){o.classList.remove('on')});
  el.classList.add('on');
  selEw=el.getAttribute('data-ew');
}

function openCk(){
  if(!cart.length)return;closeCart();selPay='';selEw='';
  var b=document.getElementById('ckBody'),sub=getSub(),ong=getOng(),tot=getTot(),ih='';
  cart.forEach(function(c){var fl=c.flavor?' <span style="color:var(--pink);font-weight:500">('+c.flavor+')</span>':'';var nt=c.note?' <span style="color:var(--muted);font-size:.72rem;font-style:italic">— '+c.note+'</span>':'';ih+='<div class="ck-sr">'+c.name+fl+nt+' <span>x'+c.qty+'</span></div><div class="ck-sr" style="padding-left:12px;color:var(--muted);font-size:.76rem">'+rp(c.price*c.qty)+'</div>'});
  b.innerHTML='<h2>Checkout</h2><p class="ck-subtitle">Lengkapi data pengiriman</p><div class="fg2"><div class="fg"><label>Nama <span class="rq">*</span></label><input class="fi" id="ckName" placeholder="Nama lengkap"><div class="fe" id="errName">Nama wajib diisi</div></div><div class="fg"><label>No. WhatsApp <span class="rq">*</span></label><input class="fi" id="ckPhone" placeholder="08xxxxxxxxxx" type="tel"><div class="fe" id="errPhone">No. WhatsApp wajib diisi</div></div></div><div class="fg"><label>Alamat Pengiriman <span class="rq">*</span></label><textarea class="fi" id="ckAddr" rows="3" placeholder="Alamat lengkap, RT/RW, Kelurahan, Kecamatan, Kota"></textarea><div class="fe" id="errAddr">Alamat wajib diisi</div></div><div class="fg"><label>Catatan Tambahan</label><input class="fi" id="ckNote" placeholder="Opsional"></div><div class="pay-sec"><h4>Metode Pembayaran</h4><div class="pay-o"><div class="pay-op" data-pay="PayPal" onclick="pickPay(this)"><i class="fab fa-paypal"></i>PayPal</div><div class="pay-op" data-pay="Kartu Kredit" onclick="pickPay(this)"><i class="fas fa-credit-card"></i>Kartu Kredit</div><div class="pay-op" data-pay="E-Wallet" onclick="pickPay(this)"><i class="fas fa-wallet"></i>E-Wallet</div><div class="pay-op" data-pay="QRIS" onclick="pickPay(this)"><i class="fas fa-qrcode"></i>QRIS</div></div><div class="pay-sub" id="paySub_PayPal"><div class="pay-sub-label">Email PayPal kamu</div><input class="fi" id="payPaypal" placeholder="contoh@email.com"></div><div class="pay-sub" id="paySub_Kartu Kredit"><div class="pay-sub-label">Nomor Rekening</div><input class="fi" id="payRekening" placeholder="Contoh: 1234 5678 9012 3456"></div><div class="pay-sub" id="paySub_E-Wallet"><div class="pay-sub-label">Pilih E-Wallet</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px"><div class="pay-op ew-opt" data-ew="OVO" onclick="pickEw(this)" style="padding:10px 6px"><i class="fas fa-wallet"></i>OVO</div><div class="pay-op ew-opt" data-ew="GoPay" onclick="pickEw(this)" style="padding:10px 6px"><i class="fas fa-wallet"></i>GoPay</div><div class="pay-op ew-opt" data-ew="DANA" onclick="pickEw(this)" style="padding:10px 6px"><i class="fas fa-wallet"></i>DANA</div><div class="pay-op ew-opt" data-ew="ShopeePay" onclick="pickEw(this)" style="padding:10px 6px"><i class="fas fa-wallet"></i>ShopeePay</div></div></div><div class="pay-sub" id="paySub_QRIS"><div class="pay-sub-label">Scan QRIS di bawah ini untuk pembayaran</div><div style="width:200px;height:200px;margin:12px auto 0;background:var(--bg2);border-radius:var(--rx);display:grid;place-items:center"><i class="fas fa-qrcode" style="font-size:4rem;color:var(--muted);opacity:.3"></i></div><div style="text-align:center;font-size:.72rem;color:var(--muted);margin-top:8px">QRIS akan muncul setelah pesanan dikonfirmasi</div></div></div><div class="ck-sum">'+ih+'<div class="ck-sr" style="margin-top:8px"><span>Ongkir</span><span>'+(ong>0?rp(ong):'<span style="color:var(--pink);font-weight:600">Gratis</span>')+'</span></div><div class="ck-sr total"><span>Total</span><span>'+rp(tot)+'</span></div></div><button class="ck-btn" id="ckSubmit" onclick="submitOrder()"><div class="spinner"></div><span class="btn-text"><i class="fas fa-paper-plane"></i> Kirim Pesanan via WhatsApp</span></button>';
  document.getElementById('ckModal').classList.add('open');document.body.style.overflow='hidden';
}
function closeCk(){document.getElementById('ckModal').classList.remove('open');document.body.style.overflow=''}

function getPayDetail(){
  if(selPay==='PayPal')return 'PayPal ('+(document.getElementById('payPaypal')?document.getElementById('payPaypal').value:'-')+')';
  if(selPay==='Kartu Kredit')return 'Kartu Kredit ('+(document.getElementById('payRekening')?document.getElementById('payRekening').value:'-')+')';
  if(selPay==='E-Wallet')return 'E-Wallet ('+(selEw||'-')+')';
  if(selPay==='QRIS')return 'QRIS';
  return selPay;
}

function submitOrder(){
  var nm=document.getElementById('ckName').value.trim(),ph=document.getElementById('ckPhone').value.trim(),ad=document.getElementById('ckAddr').value.trim(),nt=document.getElementById('ckNote').value.trim(),ok=true;
  ['ckName','ckPhone','ckAddr'].forEach(function(id){document.getElementById(id).classList.remove('err')});document.querySelectorAll('.fe').forEach(function(e){e.classList.remove('show')});
  if(!nm){document.getElementById('ckName').classList.add('err');document.getElementById('errName').classList.add('show');ok=false}
  if(!ph){document.getElementById('ckPhone').classList.add('err');document.getElementById('errPhone').classList.add('show');ok=false}
  if(!ad){document.getElementById('ckAddr').classList.add('err');document.getElementById('errAddr').classList.add('show');ok=false}
  if(!selPay){toast('Pilih metode pembayaran dulu');ok=false}
  if(selPay==='E-Wallet'&&!selEw){toast('Pilih E-Wallet dulu (OVO/GoPay/DANA/ShopeePay)');ok=false}
  if(!ok)return;
  var btn=document.getElementById('ckSubmit');btn.classList.add('loading');btn.disabled=true;
  var sub=getSub(),ong=getOng(),tot=getTot(),it='';
  cart.forEach(function(c){var fl=c.flavor?' ('+c.flavor+')':'';var nt2=c.note?' — '+c.note:'';it+='\n  - '+c.name+fl+nt2+' x'+c.qty+' = '+rp(c.price*c.qty)});
  var oid='RC-'+Date.now().toString(36).toUpperCase();
  var pd=getPayDetail();
  var msg='*PESANAN BARU — Kearly Patisserie*\n\n*Order:* '+oid+'\n*Tanggal:* '+new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})+'\n\n*Pemesan:* '+nm+'\n*WhatsApp:* '+ph+'\n*Alamat:* '+ad+(nt?'\n*Catatan:* '+nt:'')+'\n*Pembayaran:* '+pd+'\n\n*Detail Pesanan:*'+it+'\n\n*Subtotal:* '+rp(sub)+'\n*Ongkir:* '+(ong>0?rp(ong):'Gratis')+'\n*TOTAL: '+rp(tot)+'*';
  orders.push({id:oid,name:nm,phone:ph,addr:ad,note:nt,pay:pd,items:JSON.parse(JSON.stringify(cart)),subtotal:sub,ongkir:ong,total:tot,date:new Date().toISOString(),status:'paid'});saveOrders();
  setTimeout(function(){btn.classList.remove('loading');btn.disabled=false;closeCk();document.getElementById('okContent').innerHTML='<div class="ok-ico"><i class="fas fa-check"></i></div><h2>Pesanan Terkirim!</h2><p>Pesananmu sudah dikirim ke WhatsApp kami.</p><p>Kami akan segera mengkonfirmasi pesananmu.</p><div class="ok-id">'+oid+'</div><a class="ok-wa" href="https://wa.me/'+WA+'?text='+encodeURIComponent(msg)+'" target="_blank"><i class="fab fa-whatsapp"></i> Buka Chat WhatsApp</a><p style="font-size:.76rem;color:var(--muted)">Simpan kode order ini sebagai referensi</p>';document.getElementById('okModal').classList.add('open');cart=[];saveCart();renderCart()},800);
}

function openAdmin(){
  document.getElementById('adminBox').innerHTML='<div class="admin-login"><h2>Admin Login</h2><p>Masukkan password untuk melihat pesanan</p><div class="err-msg" id="adminErr">Password salah</div><input class="fi" id="adminPw" type="password" placeholder="Password" onkeydown="if(event.key===\'Enter\')adminLogin()"><button class="btn btn-fill" style="width:100%;justify-content:center;margin-top:8px" onclick="adminLogin()"><i class="fas fa-right-to-bracket"></i> Masuk</button></div>';
  document.getElementById('adminBg').classList.add('open');document.body.style.overflow='hidden';setTimeout(function(){var pw=document.getElementById('adminPw');if(pw)pw.focus()},100);
}
function closeAdmin(){document.getElementById('adminBg').classList.remove('open');document.body.style.overflow=''}
function adminLogin(){var pw=document.getElementById('adminPw').value;if(pw==='admin123'){renderAdminDash()}else{document.getElementById('adminErr').style.display='block';document.getElementById('adminPw').classList.add('err')}}
function delOrder(idx){var oid=orders[idx]?orders[idx].id:'';orders.splice(idx,1);saveOrders();renderAdminDash();toast('Pesanan '+oid+' dihapus')}
function renderAdminDash(){
  var box=document.getElementById('adminBox'),tr=0,ti=0;orders.forEach(function(o){tr+=o.total;o.items.forEach(function(i){ti+=i.qty})});
  var rh='';if(!orders.length){rh='<tr><td colspan="6" class="a-empty">Belum ada pesanan</td></tr>'}else{orders.slice().reverse().forEach(function(o,ri){var realIdx=orders.length-1-ri;var s=o.items.map(function(i){return i.name+(i.flavor?' ('+i.flavor+')':'')+' x'+i.qty}).join(', ');rh+='<tr><td><strong>'+o.id+'</strong></td><td>'+o.name+'</td><td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="'+s+'">'+s+'</td><td><strong>'+rp(o.total)+'</strong></td><td><span class="a-status paid"><span class="dot"></span>'+o.pay+'</span></td><td><button class="a-del" onclick="delOrder('+realIdx+')"><i class="fas fa-trash-alt"></i> Hapus</button></td></tr>'})}
  box.innerHTML='<div class="admin-head"><h3><i class="fas fa-chart-simple"></i> Dashboard Pesanan</h3><button class="c-x" onclick="closeAdmin()" style="position:static"><i class="fas fa-times"></i></button></div><div class="admin-body"><div class="admin-stats"><div class="a-stat"><div class="a-val">'+orders.length+'</div><div class="a-lab">Total Pesanan</div></div><div class="a-stat"><div class="a-val">'+rp(tr)+'</div><div class="a-lab">Total Pendapatan</div></div><div class="a-stat"><div class="a-val">'+ti+'</div><div class="a-lab">Item Terjual</div></div></div><table class="admin-tbl"><thead><tr><th>Order ID</th><th>Pemesan</th><th>Item</th><th>Total</th><th>Bayar</th><th>Aksi</th></tr></thead><tbody>'+rh+'</tbody></table></div>';
}

window.addEventListener('scroll',function(){document.getElementById('nav').classList.toggle('scrolled',window.scrollY>20)});
document.getElementById('burger').addEventListener('click',function(){this.classList.toggle('on');document.getElementById('navLinks').classList.toggle('mob')});
document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('burger').classList.remove('on');document.getElementById('navLinks').classList.remove('mob')})});
document.getElementById('catBar').addEventListener('click',function(e){var ch=e.target.closest('.chip');if(!ch)return;document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('on')});ch.classList.add('on');curCat=ch.getAttribute('data-cat');renderGrid()});
document.getElementById('searchIn').addEventListener('input',function(){curSearch=this.value;renderGrid()});
document.getElementById('pModal').addEventListener('click',function(e){if(e.target===this)closePM()});
document.getElementById('okModal').addEventListener('click',function(e){if(e.target===this){document.getElementById('okModal').classList.remove('open');document.body.style.overflow=''}});
var rvObs=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:0.15});
document.querySelectorAll('.rv').forEach(function(el){rvObs.observe(el)});
renderGrid();renderCart();