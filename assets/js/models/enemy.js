class Enemy {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 44;
        this.height = 32;
        this.enemyMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
            [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        ];
        this.enemyRows = [];
        this.createEnemies();
        this.vx = 1;
    }
    draw() {
        this.enemyRows.flat().forEach((enemy) => {
            this.ctx.drawImage(
                enemy.img,
                enemy.x,
                enemy.y,
                this.width,
                this.height,
            )
        })
    }
    move() {
        const rightmostEnemy = this.findRightmostEnemy(this.enemyRows);
        const leftmostEnemy = this.findLeftmostEnemy(this.enemyRows);

        // console.log("rightmostEnemy:", rightmostEnemy, "leftmostEnemy:", leftmostEnemy);


        if (rightmostEnemy.x + this.width >= this.ctx.canvas.width ||
            leftmostEnemy.x < 0
        ) {
            this.vx *= -1;
            this.enemyRows.flat().forEach((enemy) => {
            enemy.y += 35;
            });
        }
        this.enemyRows.flat().forEach((enemy) => {
            // console.log(enemy.x);
            enemy.x += this.vx;
        })
    }
    // Método para encontrar el enemigo más a la izquierda
    findRightmostEnemy() {
        let rightmostEnemy = null; // Inicializamos con null
        let maxX = -Infinity; // Valor muy pequeño para comparar posiciones

        this.enemyRows.flat().forEach((enemy) => {
            if (enemy.x > maxX) {
                maxX = enemy.x;
                rightmostEnemy = enemy;
            }
        });

        return rightmostEnemy;
    }
    // Método para encontrar el enemigo más a la izquierda
    findLeftmostEnemy() {
        let leftmostEnemy = null;
        let minX = Infinity;

        this.enemyRows.flat().forEach((enemy) => {
            if (enemy.x < minX) {
                minX = enemy.x;
                leftmostEnemy = enemy;
            }
        });

        return leftmostEnemy;
    }

    createEnemies() {
        // Itera sobre cada fila del mapa de enemigos (this.enemyMap es una matriz bidimensional)
        this.enemyMap.forEach((row, rowIndex) => {

            // Inicializa un array vacío para la fila actual en el arreglo this.enemyRows
            this.enemyRows[rowIndex] = [];

            // Itera sobre cada número (enemigo) en la fila actual
            row.forEach((enemyNumber, enemyIndex) => {

                // Si el valor en la posición actual de la fila es mayor que 0, significa que hay un enemigo
                if (enemyNumber > 0) {
                    // Crea un nuevo enemigo y lo agrega a la fila correspondiente
                    const img = new Image();
                    img.src = `assets/images/enemy${enemyNumber}.png`; // Carga de imagen correcta
                    this.enemyRows[rowIndex].push(
                        {
                            x: enemyIndex * 50,
                            y: rowIndex * 35,
                            img: img,
                        }
                        // new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
                    );
                }
            });
        });
    }
}

