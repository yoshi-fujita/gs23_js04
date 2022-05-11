let lat_me;
let lon_me;
let lat_ido;
let lon_ido;
let map;

//1．位置情報の取得に成功した時の処理
function mapsInit(position) {
  //lat=緯度、lon=経度 を取得
  lat_me = position.coords.latitude;
  lon_me = position.coords.longitude;
  console.log("自分", "lat=", lat_me, "lon=", lon_me);
  // 井戸の位置を 55m おきに正規化する
  lat_ido = Math.round(lat_me * 2000) / 2000;
  lon_ido = Math.round(lon_me * 2000) / 2000;
  // アクセスポイントの関係(?)で取得した位置が全く同じになることがあるので、乱数で少し振らせる
  const rand_x = (Math.floor(Math.random() * 1000) - 500) / 5000000;
  const rand_y = (Math.floor(Math.random() * 1000) - 500) / 5000000;
  console.log("rand_x=", rand_x, "rand_y=", rand_y);
  lat_me = lat_me + rand_y;
  lon_me = lon_me + rand_x;
  console.log("自分", "lat=", lat_me, "lon=", lon_me);
  // 自分の位置を調整する（緯度が井戸より下なら上げる）
  if (lat_ido > lat_me) {
    lat_me = lat_ido * 2 - lat_me;
  }
  console.log("自分", "lat=", lat_me, "lon=", lon_me);
  // 自分の位置を調整する（井戸の近くなら離す）
  const lat_diff = lat_me - lat_ido;
  const lon_diff = lon_me - lon_ido;
  if (lat_diff < 0.00005 && lon_diff < 0.00005 && lon_diff > -0.00005) {
    console.log("lat_diff=", lat_diff, "lon_diff=", lon_diff);
    lat_me = lat_me + 0.00005;
    if (lon_diff > 0) {
      lon_me = lon_me + 0.00005;
    } else {
      lon_me = lon_me - 0.00005;
    }
  }
  console.log("自分", "lat=", lat_me, "lon=", lon_me);
  // 自分の位置を調整する（隣の井戸との中間の人を近づける）
  if(lat_me > lat_ido + 0.0002){
      lat_me = lat_me - 0.0001;
  }
  if(lon_me > lon_ido + 0.0002){
      lon_me = lon_me - 0.0001;
  }
  if(lon_me < lon_ido - 0.0002){
    lon_me = lon_me + 0.0001;
  }
  console.log("自分", "lat=", lat_me, "lon=", lon_me);
  console.log("井戸", "lat=", lat_ido, "lon=", lon_ido);

  map = new Microsoft.Maps.Map("#myMap", {
    center: new Microsoft.Maps.Location(lat_ido, lon_ido), //Location center position
    mapTypeId: Microsoft.Maps.MapTypeId.load, //Type: [load, aerial,canvasDark,canvasLight,birdseye,grayscale,streetside]
    zoom: 20, //Zoom:1=zoomOut, 20=zoomUp[ 1~20 ]
  });
  map.setOptions({
    maxZoom: 20,
    minZoom: 1,
  });
  // アバター選択を表示
  $(".init").fadeIn(1500);
}

//2． 位置情報の取得に失敗した場合の処理
function mapsError(error) {
  let e = "";
  if (error.code == 1) {
    //1＝位置情報取得が許可されてない（ブラウザの設定）
    e = "位置情報が許可されてません";
  }
  if (error.code == 2) {
    //2＝現在地を特定できない
    e = "現在位置を特定できません";
  }
  if (error.code == 3) {
    //3＝位置情報を取得する前にタイムアウトになった場合
    e = "位置情報を取得する前にタイムアウトになりました";
  }
  alert("エラー：" + e);
}

//3.位置情報取得オプション
const set = {
  enableHighAccuracy: true, //より高精度な位置を求める
  maximumAge: 20000, //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
  timeout: 10000, //10秒以内に現在地情報を取得できなければ、処理を終了
};

//Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
function GetMap() {
  navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
}

function mapPushpin(map, lat, lon, imgURL, x_offset, y_offset) {
  const location = new Microsoft.Maps.Location(lat, lon);
  //Create custom Pushpin
  let pin = new Microsoft.Maps.Pushpin(location, {
    icon: imgURL, //base64,SVG,canvas,iframe
    anchor: new Microsoft.Maps.Point(x_offset + 24, y_offset + 24), //position move
  });

  map.entities.push(pin);
}
