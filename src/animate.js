export function animate(time, speed) {
    let isAnimating = true;
    let tarTime = time;
    let s = true;
    return {
        id: "animate",
        update() {
            if (debug.fps() > 1) {            
                var deltaTime = 1/debug.fps();
                tarTime -= deltaTime;
                
                if (tarTime < 0) {
                    s = !s;
                    tarTime = time;
                }

                if (s) {
                    this.scale.x += deltaTime * speed;
                    this.scale.y += deltaTime * speed;

                } 
                if (!s) {
                    this.scale.x -= deltaTime * speed;
                    this.scale.y -= deltaTime * speed;

                }
            }
        }
    }
}