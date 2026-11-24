// Browser visualization of Josh's RandomTilemap.DestroyTilesFromMiddle.
// Source: AscentionPCG/Assets/Scripts/RandomTilemap.cs.
// Same center start, four cardinal choices, revisit gate and two-cell edge stop.
// Unity prefab placement/cleanup is not part of this opening visualization.
const host = document.getElementById('hero');
if (host) import('three').then(THREE => start(THREE)).catch(() => host.classList.add('still'));
function start(T) {
  let renderer;
  try { renderer = new T.WebGLRenderer({antialias:true, alpha:true}); }
  catch { host.classList.add('still'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-70,70,55,-55,0.1,500);
  camera.position.set(0,0,150);
  const group = new T.Group(); scene.add(group);
  const geometry = new T.PlaneGeometry(.88,.88);
  const material = new T.MeshBasicMaterial({color:0xffffff});
  const tiles = new T.InstancedMesh(geometry,material,10000);
  const transform = new T.Object3D();
  const dark = new T.Color('#172739'), carved = new T.Color('#49bfae');
  for(let y=0;y<100;y++) for(let x=0;x<100;x++) {
    const i=y*100+x; transform.position.set(x-50,y-50,0);transform.updateMatrix();
    tiles.setMatrixAt(i,transform.matrix); tiles.setColorAt(i,dark);
  }
  group.add(tiles);
  const cursor = new T.Mesh(new T.PlaneGeometry(1.8,1.8),new T.MeshBasicMaterial({color:'#d6fff0'}));
  group.add(cursor);
  let x=50,y=50,count=0,steps=0,finished=false,paused=false,visible=true;
  const visited = new Set();
  const label=document.getElementById('walk-status'), pause=document.getElementById('walk-pause');
  function updateLabel(){label.textContent=`${count.toLocaleString()} cells carved · ${finished?'edge reached':paused?'paused':'walking'}`;}
  function step(){
    if(x>=98||y<=2||y>=98||x<=2){finished=true;return;}
    const i=y*100+x;
    // Unity's Random.Range(0,100) != 1 gate for revisiting an empty tile.
    if(visited.has(i)&&Math.floor(Math.random()*100)!==1)return;
    if(!visited.has(i)){visited.add(i);count++;tiles.setColorAt(i,carved);}
    switch(Math.floor(Math.random()*4)){case 0:x++;break;case 1:y--;break;case 2:x--;break;default:y++;}
    steps++;
  }
  function draw(){cursor.position.set(x-50,y-50,1);tiles.instanceColor.needsUpdate=true;renderer.render(scene,camera);updateLabel();}
  function reset(){for(const i of visited)tiles.setColorAt(i,dark);visited.clear();x=y=50;count=steps=0;finished=false;
    draw();}
  function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);const aspect=w/h;
    camera.left=-55*aspect;camera.right=55*aspect;camera.top=55;camera.bottom=-55;camera.updateProjectionMatrix();
    group.position.x=w>760?Math.min(55*aspect*.48,48):0;group.rotation.z=-.12;draw();}
  document.getElementById('walk-reset').addEventListener('click',reset);
  pause.textContent=paused?'Play animation':'Pause animation';pause.setAttribute('aria-pressed',String(paused));
  pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Play animation':'Pause animation';pause.setAttribute('aria-pressed',String(paused));updateLabel();});
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;}).observe(host);
  reset();resize();let last=0;
  renderer.setAnimationLoop(now=>{if(paused||finished||!visible||document.hidden||now-last<33)return;last=now;
    const before=steps;for(let i=0;i<8000&&steps-before<6&&!finished;i++)step();draw();});
  // Pause hidden pages without destroying resources needed by browser back/forward cache.
  window.addEventListener('pagehide',()=>{visible=false;});
  window.addEventListener('pageshow',()=>{visible=true;resize();});
}
