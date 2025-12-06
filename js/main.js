// 全局变量
let currentSection = 'home';
let gameStartTime = null;
let gameTimer = null;
let gameScore = 0;
let currentGame = null;
let difficulty = 1;
let soundEnabled = true;

// 更新个人记录显示
function updateRecords() {
    const totalStats = JSON.parse(localStorage.getItem('totalStats')) || {
        totalTime: 0,
        completedGames: 0,
        highScore: 0
    };
    
    // 更新总游戏时长
    const totalTimeMinutes = Math.floor(totalStats.totalTime / 60);
    document.getElementById('total-time').textContent = totalTimeMinutes + '分钟';
    
    // 更新完成游戏次数
    document.getElementById('completed-games').textContent = totalStats.completedGames + '次';
    
    // 更新最高分数
    document.getElementById('high-score').textContent = totalStats.highScore + '分';
    
    // 更新最近7天进度图表
    updateProgressChart();
}

// 更新进度图表
function updateProgressChart() {
    const gameData = JSON.parse(localStorage.getItem('gameData')) || [];
    const ctx = document.getElementById('progress-canvas').getContext('2d');
    
    // 清除画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // 准备数据
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        
        // 统计当天的游戏次数
        const dayGames = gameData.filter(game => game.day === dateStr);
        last7Days.push({
            date: dateStr,
            games: dayGames.length
        });
    }
    
    // 绘制简单图表
    ctx.fillStyle = '#4CAF50';
    ctx.strokeStyle = '#388e3c';
    ctx.lineWidth = 3;
    
    const chartWidth = ctx.canvas.width - 80;
    const chartHeight = ctx.canvas.height - 60;
    const barWidth = chartWidth / 7 - 10;
    const maxGames = Math.max(...last7Days.map(day => day.games), 1);
    
    // 绘制柱状图
    last7Days.forEach((day, index) => {
        const barHeight = (day.games / maxGames) * chartHeight;
        const x = 40 + index * (barWidth + 10);
        const y = ctx.canvas.height - 30 - barHeight;
        
        // 绘制柱子
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // 绘制日期标签
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(day.date.split(' ')[2], x + barWidth / 2, ctx.canvas.height - 10);
        
        // 绘制游戏次数
        ctx.fillStyle = '#333';
        ctx.fillText(day.games, x + barWidth / 2, y - 10);
        
        ctx.fillStyle = '#4CAF50';
    });
}

// 页面加载完成后初始化
window.addEventListener('load', function() {
    // 显示默认页面
    showSection('home');
    
    // 更新个人记录
    updateRecords();
    
    // 开始使用时长计时
    setTimeout(showReminder, 30 * 60 * 1000); // 30分钟后显示提醒
});

// 显示指定区域
function showSection(sectionId) {
    // 隐藏所有区域
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示选中的区域
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        currentSection = sectionId;
        
        // 如果是个人记录页面，更新记录显示
        if (sectionId === 'records') {
            updateRecords();
        }
    }
    
    // 隐藏游戏容器
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('active');
}

// 游戏区域切换
function showGameSection(gameId) {
    // 隐藏所有其他区域
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示游戏容器
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.add('active');
    
    currentGame = gameId;
    
    // 初始化游戏
    initGame();
}

// 初始化游戏
function initGame() {
    // 清除之前的游戏内容和计时器
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>游戏加载中...</h2>';
    stopGameTimer();
    
    // 根据当前游戏类型初始化
    switch(currentGame) {
        case 'memory':
            initMemoryGame();
            break;
        case 'click':
            initClickGame();
            break;
        case 'attention':
            initAttentionGame();
            break;
        case 'calculation':
            initCalculationGame();
            break;

        case 'seqmemory':
            initSeqmemoryGame();
            break;
        case 'reaction':
            initReactionGame();
            break;
        case 'colorword':
            initColorwordGame();
            break;
        case 'sudoku':
            initSudokuGame();
            break;
    }
    
    // 启动游戏计时器
    startSimpleGame();
}

// 记忆力游戏初始化
function initMemoryGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>记忆力游戏</h2><p>记住数字的位置，然后按顺序点击它们！</p>';
    // 这里将在后续实现完整的游戏逻辑
}

// 数独游戏初始化
function initSudokuGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>简易数独</h2><p>在空格中填入1-9的数字，每行、每列、每个3x3区域都不能重复！</p>';
    // 这里将在后续实现完整的游戏逻辑
}

// 点击训练游戏初始化
function initClickGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>点击训练</h2><p>点击出现的目标，越快越好！</p>';
    // 这里将在后续实现完整的游戏逻辑
}

// 注意力训练游戏初始化
function initAttentionGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>注意力训练</h2><p>找出不同的那个物体！</p>';
    // 这里将在后续实现完整的游戏逻辑
}

// 计算训练游戏初始化
function initCalculationGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>计算训练</h2><p>快速计算出正确答案！</p>';
    // 这里将在后续实现完整的游戏逻辑
}

// 切换字体大小
function toggleFontSize() {
    document.body.classList.toggle('large-font');
}

// 切换高对比度模式
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

// 切换声音开关
function toggleSound() {
    soundEnabled = !soundEnabled;
}

// 显示使用时长提醒
function showReminder() {
    const reminder = document.getElementById('reminder');
    reminder.style.display = 'flex';
}

// 关闭提醒
function closeReminder() {
    const reminder = document.getElementById('reminder');
    reminder.style.display = 'none';
    
    // 重置提醒计时
    setTimeout(showReminder, 30 * 60 * 1000);
}



// 记忆力游戏实现
function initMemoryGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>记忆力训练</h2>
        <div id="memory-game" class="memory-game">
            <!-- 游戏内容将通过JavaScript动态生成 -->
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '记忆力训练';
    
    const memoryGame = document.getElementById('memory-game');
    memoryGame.innerHTML = '';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    // 根据难度设置卡片数量
    const cardCounts = [8, 12, 16]; // 简单、中等、困难
    const cardCount = cardCounts[difficulty - 1];
    
    // 生成卡片数据
    const cardValues = [];
    for (let i = 0; i < cardCount / 2; i++) {
        cardValues.push(i + 1);
        cardValues.push(i + 1);
    }
    
    // 洗牌算法
    for (let i = cardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
    }
    
    // 显示卡片
    let flippedCards = [];
    let matchedPairs = 0;
    
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = value;
        card.dataset.index = index;
        card.textContent = '?';
        
        card.addEventListener('click', () => {
            // 如果已经翻开了2张卡片，或者这张卡片已经翻开或匹配，就不处理
            if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }
            
            // 翻开卡片
            card.classList.add('flipped');
            card.textContent = value;
            
            flippedCards.push(card);
            
            // 如果翻开了2张卡片，检查是否匹配
            if (flippedCards.length === 2) {
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];
                
                if (card1.dataset.value === card2.dataset.value) {
                    // 匹配成功
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    flippedCards = [];
                    matchedPairs++;
                    
                    // 增加分数
                    gameScore += 10;
                    document.getElementById('game-score').textContent = gameScore;
                    
                    // 显示匹配成功反馈
                    showFeedback('匹配成功！', true);
                    
                    // 检查游戏是否结束
                    if (matchedPairs === cardCount / 2) {
                        setTimeout(() => {
                            const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
                            endGame();
                        }, 1000);
                    }
                } else {
                    // 匹配失败，1秒后翻回
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card1.textContent = '?';
                        card2.classList.remove('flipped');
                        card2.textContent = '?';
                        flippedCards = [];
                        
                        // 显示匹配失败反馈
                        showFeedback('匹配失败，再试一次！', false);
                    }, 1000);
                }
            }
        });
        
        memoryGame.appendChild(card);
    });
}

// 数独游戏实现
function initSudokuGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>简易数独</h2>
        <div id="sudoku-game" class="sudoku-game">
            <!-- 游戏内容将通过JavaScript动态生成 -->
        </div>
        <div class="sudoku-controls">
            <button class="sudoku-number" data-value="1">1</button>
            <button class="sudoku-number" data-value="2">2</button>
            <button class="sudoku-number" data-value="3">3</button>
            <button class="sudoku-number" data-value="4">4</button>
            <button class="sudoku-number" data-value="5">5</button>
            <button class="sudoku-number" data-value="6">6</button>
            <button class="sudoku-number" data-value="7">7</button>
            <button class="sudoku-number" data-value="8">8</button>
            <button class="sudoku-number" data-value="9">9</button>
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '简易数独';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    const sudokuGame = document.getElementById('sudoku-game');
    sudokuGame.innerHTML = '';
    
    // 生成一个简单的数独谜题
    const sudokuBoard = generateSudokuPuzzle();
    
    // 显示数独棋盘
    let selectedCell = null;
    
    for (let regionY = 0; regionY < 3; regionY++) {
        for (let regionX = 0; regionX < 3; regionX++) {
            const region = document.createElement('div');
            region.className = 'sudoku-region';
            
            for (let cellY = 0; cellY < 3; cellY++) {
                for (let cellX = 0; cellX < 3; cellX++) {
                    const boardX = regionX * 3 + cellX;
                    const boardY = regionY * 3 + cellY;
                    const value = sudokuBoard[boardY][boardX];
                    
                    const cell = document.createElement('div');
                    cell.className = 'sudoku-cell';
                    cell.dataset.x = boardX;
                    cell.dataset.y = boardY;
                    
                    if (value !== 0) {
                        cell.textContent = value;
                        cell.classList.add('filled');
                    }
                    
                    // 点击单元格选择
                    cell.addEventListener('click', () => {
                        if (!cell.classList.contains('filled')) {
                            // 移除之前的选择
                            if (selectedCell) {
                                selectedCell.classList.remove('selected');
                            }
                            // 选择当前单元格
                            selectedCell = cell;
                            cell.classList.add('selected');
                        }
                    });
                    
                    region.appendChild(cell);
                }
            }
            
            sudokuGame.appendChild(region);
        }
    }
    
    // 数字按钮事件
    const numberButtons = document.querySelectorAll('.sudoku-number');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (selectedCell) {
                const value = parseInt(button.dataset.value);
                const x = parseInt(selectedCell.dataset.x);
                const y = parseInt(selectedCell.dataset.y);
                
                // 检查数字是否合法
                if (isValidSudokuMove(sudokuBoard, x, y, value)) {
                    // 填充数字
                    selectedCell.textContent = value;
                    selectedCell.classList.remove('error');
                    sudokuBoard[y][x] = value;
                    
                    // 增加分数
                    gameScore += 5;
                    document.getElementById('game-score').textContent = gameScore;
                    
                    showFeedback('正确！', true);
                    
                    // 检查游戏是否完成
                    if (isSudokuComplete(sudokuBoard)) {
                        setTimeout(() => {
                            endGame();
                        }, 1000);
                    }
                } else {
                    // 显示错误
                    selectedCell.classList.add('error');
                    showFeedback('这个数字不能放在这里！', false);
                }
            }
        });
    });
}

// 生成数独谜题（优化版）
function generateSudokuPuzzle() {
    // 准备多个不同的基础谜题，增加多样性
    const basePuzzles = [
        [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        [
            [0, 0, 0, 2, 6, 0, 7, 0, 1],
            [6, 8, 0, 0, 7, 0, 0, 9, 0],
            [1, 9, 0, 0, 0, 4, 5, 0, 0],
            [8, 2, 0, 1, 0, 0, 0, 4, 0],
            [0, 0, 4, 6, 0, 2, 9, 0, 0],
            [0, 5, 0, 0, 0, 3, 0, 2, 8],
            [0, 0, 9, 3, 0, 0, 0, 7, 4],
            [0, 4, 0, 0, 5, 0, 0, 3, 6],
            [7, 0, 3, 0, 1, 8, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    ];
    
    // 根据难度调整已填数字数量
    const filledCounts = [45, 35, 25]; // 简单、中等、困难
    const filledCount = filledCounts[difficulty - 1];
    
    // 随机选择一个基础谜题
    const randomIndex = Math.floor(Math.random() * basePuzzles.length);
    const basePuzzle = basePuzzles[randomIndex];
    
    // 创建谜题副本
    const puzzle = basePuzzle.map(row => [...row]);
    
    // 随机移除一些数字
    let cellsToRemove = 81 - filledCount;
    
    // 创建所有单元格的列表
    const cells = [];
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (puzzle[y][x] !== 0) {
                cells.push({x, y});
            }
        }
    }
    
    // 打乱单元格顺序
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    
    // 移除数字，直到达到目标数量
    let removed = 0;
    for (const cell of cells) {
        if (removed >= cellsToRemove) break;
        
        const backup = puzzle[cell.y][cell.x];
        puzzle[cell.y][cell.x] = 0;
        removed++;
    }
    
    return puzzle;
}

// 检查数独移动是否合法
function isValidSudokuMove(board, x, y, value) {
    // 检查行
    for (let i = 0; i < 9; i++) {
        if (board[y][i] === value && i !== x) {
            return false;
        }
    }
    
    // 检查列
    for (let i = 0; i < 9; i++) {
        if (board[i][x] === value && i !== y) {
            return false;
        }
    }
    
    // 检查3x3区域
    const regionX = Math.floor(x / 3);
    const regionY = Math.floor(y / 3);
    for (let i = regionY * 3; i < regionY * 3 + 3; i++) {
        for (let j = regionX * 3; j < regionX * 3 + 3; j++) {
            if (board[i][j] === value && (i !== y || j !== x)) {
                return false;
            }
        }
    }
    
    return true;
}

// 检查数独是否完成
function isSudokuComplete(board) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }
    return true;
}

// 点击训练游戏实现
function initClickGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>点击训练</h2>
        <div id="click-game" class="click-game">
            <!-- 游戏内容将通过JavaScript动态生成 -->
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '点击训练';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    const clickGame = document.getElementById('click-game');
    clickGame.innerHTML = '';
    
    // 游戏设置
    const gameDuration = 60; // 游戏时长60秒
    let remainingTime = gameDuration;
    let targetsHit = 0;
    let targetsMissed = 0;
    
    // 根据难度调整目标大小和出现时间
    const targetSizes = [60, 50, 40]; // 简单、中等、困难
    const targetDurations = [2000, 1500, 1000]; // 目标持续时间
    const targetSpawnRates = [1000, 800, 600]; // 目标生成间隔
    
    const targetSize = targetSizes[difficulty - 1];
    const targetDuration = targetDurations[difficulty - 1];
    const targetSpawnRate = targetSpawnRates[difficulty - 1];
    
    // 游戏区域尺寸
    const gameWidth = clickGame.clientWidth;
    const gameHeight = clickGame.clientHeight;
    
    // 游戏计时器
    const timer = setInterval(() => {
        remainingTime--;
        
        // 生成新目标
        spawnTarget();
        
        // 检查游戏是否结束
        if (remainingTime <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, targetSpawnRate);
    
    // 生成目标
    function spawnTarget() {
        // 随机位置
        const x = Math.random() * (gameWidth - targetSize);
        const y = Math.random() * (gameHeight - targetSize);
        
        // 创建目标
        const target = document.createElement('div');
        target.className = 'click-target';
        target.style.width = `${targetSize}px`;
        target.style.height = `${targetSize}px`;
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        
        // 目标点击事件
        target.addEventListener('click', () => {
            // 命中目标
            target.classList.add('hit');
            targetsHit++;
            gameScore += 10;
            document.getElementById('game-score').textContent = gameScore;
            
            showFeedback('命中！', true);
            
            // 移除目标
            setTimeout(() => {
                if (target.parentNode) {
                    target.parentNode.removeChild(target);
                }
            }, 500);
        });
        
        // 添加到游戏区域
        clickGame.appendChild(target);
        
        // 超时后移除目标
        setTimeout(() => {
            if (target.parentNode && !target.classList.contains('hit')) {
                // 未命中
                targetsMissed++;
                target.parentNode.removeChild(target);
            }
        }, targetDuration);
    }
    
    // 游戏结束时清除所有目标
    function cleanup() {
        clearInterval(timer);
        const targets = clickGame.querySelectorAll('.click-target');
        targets.forEach(target => target.remove());
    }
    
    // 重新开始游戏时调用清除函数
    window.addEventListener('beforeunload', cleanup);
}

// 注意力训练游戏实现
function initAttentionGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>注意力训练</h2>
        <div id="attention-game" class="attention-game">
            <!-- 游戏内容将通过JavaScript动态生成 -->
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '注意力训练';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    const attentionGame = document.getElementById('attention-game');
    attentionGame.innerHTML = '';
    
    // 游戏设置
    const gameRounds = 10; // 游戏轮数
    let currentRound = 0;
    
    // 根据难度调整物体数量和差异程度
    const objectCounts = [9, 16, 25]; // 简单、中等、困难
    const objectSizes = [50, 45, 40]; // 物体大小
    
    const objectCount = objectCounts[difficulty - 1];
    const objectSize = objectSizes[difficulty - 1];
    
    // 游戏区域尺寸
    const gameWidth = attentionGame.clientWidth;
    const gameHeight = attentionGame.clientHeight;
    
    // 开始游戏
    startNextRound();
    
    function startNextRound() {
        if (currentRound >= gameRounds) {
            // 游戏结束
            endGame();
            return;
        }
        
        currentRound++;
        attentionGame.innerHTML = '';
        
        // 生成颜色
        const baseColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        const targetColor = `hsl(${(Math.random() * 360 + 180) % 360}, 70%, 60%)`;
        
        // 随机选择目标位置
        const targetIndex = Math.floor(Math.random() * objectCount);
        
        // 计算网格大小
        const gridSize = Math.sqrt(objectCount);
        const spacing = 10;
        const totalSize = (objectSize + spacing) * gridSize - spacing;
        
        // 居中定位
        const offsetX = (gameWidth - totalSize) / 2;
        const offsetY = (gameHeight - totalSize) / 2;
        
        // 生成物体
        for (let i = 0; i < objectCount; i++) {
            const object = document.createElement('div');
            object.className = 'attention-object';
            
            // 计算位置
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const x = offsetX + col * (objectSize + spacing);
            const y = offsetY + row * (objectSize + spacing);
            
            object.style.width = `${objectSize}px`;
            object.style.height = `${objectSize}px`;
            object.style.left = `${x}px`;
            object.style.top = `${y}px`;
            
            // 设置颜色
            if (i === targetIndex) {
                object.style.backgroundColor = targetColor;
                object.classList.add('target');
            } else {
                object.style.backgroundColor = baseColor;
            }
            
            // 点击事件
            object.addEventListener('click', () => {
                if (object.classList.contains('target')) {
                    // 找到目标
                    object.classList.add('caught');
                    gameScore += 15;
                    document.getElementById('game-score').textContent = gameScore;
                    
                    showFeedback('找到啦！', true);
                    
                    // 延迟开始下一轮
                    setTimeout(startNextRound, 1000);
                } else {
                    // 点击错误
                    gameScore -= 5;
                    document.getElementById('game-score').textContent = gameScore;
                    
                    showFeedback('再仔细看看！', false);
                }
            });
            
            attentionGame.appendChild(object);
        }
    }
}

// 计算训练游戏实现
function initCalculationGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>计算训练</h2>
        <div id="calculation-game" class="calculation-game">
            <!-- 游戏内容将通过JavaScript动态生成 -->
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '计算训练';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    const calculationGame = document.getElementById('calculation-game');
    calculationGame.innerHTML = '';
    
    // 游戏设置
    const gameRounds = 15; // 游戏轮数
    let currentRound = 0;
    
    // 开始游戏
    generateQuestion();
    
    function generateQuestion() {
        if (currentRound >= gameRounds) {
            // 游戏结束
            endGame();
            return;
        }
        
        currentRound++;
        calculationGame.innerHTML = '';
        
        // 根据难度调整运算类型和数字范围
        let num1, num2, operator, answer;
        
        // 运算类型
        const operators = ['+', '-', '*', '/'];
        
        if (difficulty === 1) {
            // 简单：只做加法和减法，数字较小
            operator = operators[Math.floor(Math.random() * 2)];
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        } else if (difficulty === 2) {
            // 中等：包含乘法和除法，数字适中
            operator = operators[Math.floor(Math.random() * 3)];
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        } else {
            // 困难：包含所有运算，数字较大
            operator = operators[Math.floor(Math.random() * 4)];
            num1 = Math.floor(Math.random() * 30) + 1;
            num2 = Math.floor(Math.random() * 15) + 1;
        }
        
        // 确保减法结果为正数
        if (operator === '-') {
            num1 = Math.max(num1, num2);
            answer = num1 - num2;
        } 
        // 确保除法结果为整数
        else if (operator === '/') {
            num1 = num2 * Math.floor(Math.random() * 10) + num2;
            answer = num1 / num2;
        } 
        else if (operator === '+') {
            answer = num1 + num2;
        } 
        else if (operator === '*') {
            answer = num1 * num2;
        }
        
        // 生成选项
        const options = [answer];
        
        // 生成干扰项
        while (options.length < 4) {
            let distractor;
            const range = difficulty * 5;
            distractor = Math.floor(answer + (Math.random() - 0.5) * range * 2);
            
            // 确保干扰项为整数且不重复
            distractor = Math.round(distractor);
            if (!options.includes(distractor)) {
                options.push(distractor);
            }
        }
        
        // 打乱选项顺序
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        // 创建题目
        const questionDiv = document.createElement('div');
        questionDiv.className = 'calculation-question';
        questionDiv.textContent = `${num1} ${operator} ${num2} = ?`;
        calculationGame.appendChild(questionDiv);
        
        // 创建选项
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'calculation-options';
        
        options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'calculation-option';
            optionBtn.textContent = option;
            optionBtn.dataset.answer = option;
            
            optionBtn.addEventListener('click', () => {
                if (parseFloat(optionBtn.dataset.answer) === answer) {
                    // 正确答案
                    optionBtn.classList.add('correct');
                    gameScore += 10;
                    document.getElementById('game-score').textContent = gameScore;
                    showFeedback('回答正确！', true);
                } else {
                    // 错误答案
                    optionBtn.classList.add('incorrect');
                    gameScore -= 5;
                    document.getElementById('game-score').textContent = gameScore;
                    showFeedback('再试一次！', false);
                }
                
                // 1秒后生成下一题
                setTimeout(generateQuestion, 1000);
            });
            
            optionsDiv.appendChild(optionBtn);
        });
        
        calculationGame.appendChild(optionsDiv);
    }
}



// 序列记忆游戏实现
function initSeqmemoryGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>序列记忆</h2>
        <div class="seqmemory-game">
            <div id="seqmemory-board" class="seqmemory-board"></div>
            <div class="seqmemory-instructions">
                <p>观察并记住闪烁的序列，然后按顺序点击</p>
            </div>
            <div class="seqmemory-controls">
                <button class="seqmemory-btn" onclick="startSeqmemoryGame()">开始游戏</button>
            </div>
        </div>
        <div class="seqmemory-info">
            <span>当前关卡：<span id="seqmemory-level">1</span></span>
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '序列记忆';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    // 游戏设置
    const gridSize = 3;
    let sequence = [];
    let userSequence = [];
    let level = 1;
    
    // 生成序列记忆游戏板
    const seqmemoryBoard = document.getElementById('seqmemory-board');
    seqmemoryBoard.style.display = 'grid';
    seqmemoryBoard.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
    seqmemoryBoard.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;
    seqmemoryBoard.style.gap = '15px';
    seqmemoryBoard.style.padding = '30px';
    seqmemoryBoard.style.backgroundColor = '#f0f0f0';
    seqmemoryBoard.style.borderRadius = '15px';
    
    // 创建游戏按钮
    for (let i = 0; i < gridSize * gridSize; i++) {
        const button = document.createElement('button');
        button.className = 'seqmemory-button';
        button.dataset.index = i;
        button.style.width = '80px';
        button.style.height = '80px';
        button.style.fontSize = '32px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '10px';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.2s ease';
        button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        
        // 点击事件
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            userSequence.push(index);
            
            // 高亮显示按钮
            button.style.backgroundColor = '#2196F3';
            setTimeout(() => {
                button.style.backgroundColor = '#4CAF50';
            }, 200);
            
            // 检查用户输入
            if (userSequence.length === sequence.length) {
                if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
                    // 正确
                    level++;
                    document.getElementById('seqmemory-level').textContent = level;
                    gameScore += 15;
                    document.getElementById('game-score').textContent = gameScore;
                    showFeedback('正确！进入下一关', true);
                    userSequence = [];
                    setTimeout(generateSequence, 1500);
                } else {
                    // 错误
                    showFeedback('错误！重新开始', false);
                    userSequence = [];
                    setTimeout(generateSequence, 1500);
                }
            }
        });
        
        seqmemoryBoard.appendChild(button);
    }
    
    // 生成序列
    function generateSequence() {
        sequence.push(Math.floor(Math.random() * (gridSize * gridSize)));
        displaySequence();
    }
    
    // 显示序列
    function displaySequence() {
        let index = 0;
        const buttons = document.querySelectorAll('.seqmemory-button');
        
        const interval = setInterval(() => {
            if (index < sequence.length) {
                const button = buttons[sequence[index]];
                button.style.backgroundColor = '#FF9800';
                setTimeout(() => {
                    button.style.backgroundColor = '#4CAF50';
                }, 500);
                index++;
            } else {
                clearInterval(interval);
                // 允许用户输入
            }
        }, 800);
    }
    
    // 开始游戏
    window.startSeqmemoryGame = function() {
        sequence = [];
        userSequence = [];
        level = 1;
        document.getElementById('seqmemory-level').textContent = level;
        generateSequence();
    };
}

// 反应测试游戏实现
function initReactionGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>反应测试</h2>
        <div class="reaction-game">
            <div id="reaction-target" class="reaction-target">
                <p id="reaction-text">点击开始</p>
            </div>
        </div>
        <div class="reaction-info">
            <span>最佳反应时间：<span id="reaction-best">--</span> ms</span>
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '反应测试';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    // 游戏设置
    let isWaiting = false;
    let startTime = 0;
    let bestTime = null;
    
    const reactionTarget = document.getElementById('reaction-target');
    const reactionText = document.getElementById('reaction-text');
    
    // 样式设置
    reactionTarget.style.width = '300px';
    reactionTarget.style.height = '300px';
    reactionTarget.style.backgroundColor = '#4CAF50';
    reactionTarget.style.borderRadius = '150px';
    reactionTarget.style.display = 'flex';
    reactionTarget.style.justifyContent = 'center';
    reactionTarget.style.alignItems = 'center';
    reactionTarget.style.cursor = 'pointer';
    reactionTarget.style.transition = 'all 0.2s ease';
    reactionTarget.style.fontSize = '28px';
    reactionTarget.style.color = 'white';
    reactionTarget.style.fontWeight = 'bold';
    
    // 点击事件
    reactionTarget.addEventListener('click', () => {
        if (!isWaiting) {
            // 开始游戏
            isWaiting = true;
            reactionText.textContent = '等待绿色...';
            reactionTarget.style.backgroundColor = '#FFC107';
            
            // 随机延迟
            const delay = Math.random() * 2000 + 1000;
            setTimeout(() => {
                reactionText.textContent = '点击！';
                reactionTarget.style.backgroundColor = '#4CAF50';
                startTime = Date.now();
            }, delay);
        } else {
            // 计算反应时间
            const reactionTime = Date.now() - startTime;
            isWaiting = false;
            
            // 更新最佳时间
            if (!bestTime || reactionTime < bestTime) {
                bestTime = reactionTime;
                document.getElementById('reaction-best').textContent = bestTime;
            }
            
            // 显示结果
            reactionText.textContent = `反应时间：${reactionTime} ms\n点击继续`;
            reactionTarget.style.backgroundColor = '#2196F3';
            
            // 增加分数
            gameScore += Math.max(0, 1000 - reactionTime);
            document.getElementById('game-score').textContent = gameScore;
            showFeedback(`反应时间：${reactionTime} ms`, true);
        }
    });
}

// 颜色词测试游戏实现
function initColorwordGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>颜色词测试</h2>
        <div class="colorword-game">
            <div id="colorword-word" class="colorword-word"></div>
            <div class="colorword-controls">
                <button class="colorword-btn" data-color="red">红色</button>
                <button class="colorword-btn" data-color="green">绿色</button>
                <button class="colorword-btn" data-color="blue">蓝色</button>
                <button class="colorword-btn" data-color="yellow">黄色</button>
            </div>
        </div>
        <div class="colorword-info">
            <span>正确次数：<span id="colorword-correct">0</span></span>
            <span>错误次数：<span id="colorword-incorrect">0</span></span>
        </div>
    `;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = '颜色词测试';
    
    // 重置游戏状态
    gameScore = 0;
    document.getElementById('game-score').textContent = gameScore;
    gameStartTime = Date.now();
    updateGameTime();
    
    // 游戏设置
    const colors = ['red', 'green', 'blue', 'yellow'];
    const colorNames = {
        'red': '红色',
        'green': '绿色',
        'blue': '蓝色',
        'yellow': '黄色'
    };
    let correctCount = 0;
    let incorrectCount = 0;
    
    const colorwordWord = document.getElementById('colorword-word');
    const colorwordBtns = document.querySelectorAll('.colorword-btn');
    
    // 样式设置
    colorwordWord.style.fontSize = '64px';
    colorwordWord.style.fontWeight = 'bold';
    colorwordWord.style.marginBottom = '30px';
    colorwordWord.style.textAlign = 'center';
    
    // 设置按钮样式
    colorwordBtns.forEach(btn => {
        btn.style.width = '120px';
        btn.style.height = '60px';
        btn.style.fontSize = '24px';
        btn.style.margin = '10px';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '10px';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.2s ease';
    });
    
    // 生成新题目
    function generateColorword() {
        const wordColor = colors[Math.floor(Math.random() * colors.length)];
        const wordText = colors[Math.floor(Math.random() * colors.length)];
        
        colorwordWord.textContent = colorNames[wordText];
        colorwordWord.style.color = wordColor;
        
        // 点击事件
        colorwordBtns.forEach(btn => {
            btn.onclick = () => {
                const selectedColor = btn.dataset.color;
                if (selectedColor === wordColor) {
                    // 正确
                    correctCount++;
                    document.getElementById('colorword-correct').textContent = correctCount;
                    gameScore += 10;
                    document.getElementById('game-score').textContent = gameScore;
                    showFeedback('回答正确！', true);
                } else {
                    // 错误
                    incorrectCount++;
                    document.getElementById('colorword-incorrect').textContent = incorrectCount;
                    showFeedback('回答错误！', false);
                }
                
                // 生成新题目
                setTimeout(generateColorword, 1000);
            };
        });
    }
    
    // 开始游戏
    generateColorword();
}

// 游戏难度调整
function changeDifficulty() {
    const difficultySelect = document.getElementById('difficulty-select');
    difficulty = parseInt(difficultySelect.value);
    if (currentGame) {
        initGame();
    }
}

// 重新开始游戏
function restartGame() {
    if (currentGame) {
        initGame();
    }
}

// 游戏反馈显示
function showFeedback(message, isCorrect) {
    const feedbackDiv = document.getElementById('game-feedback');
    feedbackDiv.textContent = message;
    feedbackDiv.className = isCorrect ? 'game-feedback correct' : 'game-feedback incorrect';
    
    // 3秒后清除反馈
    setTimeout(() => {
        feedbackDiv.textContent = '';
    }, 3000);
}

// 记录游戏数据
function recordGameData(gameType, score, time) {
    // 简单的本地存储实现
    let gameData = JSON.parse(localStorage.getItem('gameData')) || [];
    const today = new Date().toDateString();
    
    // 添加游戏记录
    gameData.push({
        gameType: gameType,
        score: score,
        time: time,
        date: new Date().toISOString(),
        day: today
    });
    localStorage.setItem('gameData', JSON.stringify(gameData));
    
    // 更新总游戏时长和完成次数
    updateTotalStats(score, time);
}

// 更新总游戏统计
function updateTotalStats(score, time) {
    let totalStats = JSON.parse(localStorage.getItem('totalStats')) || {
        totalTime: 0,
        completedGames: 0,
        highScore: 0
    };
    
    totalStats.totalTime += time;
    totalStats.completedGames += 1;
    totalStats.highScore = Math.max(totalStats.highScore, score);
    
    localStorage.setItem('totalStats', JSON.stringify(totalStats));
}

// 显示游戏结果
function showGameResult(score, time) {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>游戏结束</h2>
        <div style="text-align: center; margin: 30px 0;">
            <p>最终得分: <strong>${score}</strong></p>
            <p>用时: <strong>${time}秒</strong></p>
            <button onclick="showSection('games')" class="nav-btn" style="margin: 20px;">返回游戏选择</button>
        </div>
    `;
}

// 简单的游戏实现示例
function startSimpleGame() {
    gameScore = 0;
    gameStartTime = Date.now();
    
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    gameTimer = setInterval(updateGameTime, 1000);
}

// 更新游戏时间
function updateGameTime() {
    if (gameStartTime) {
        const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
        document.getElementById('game-time').textContent = elapsedTime;
    }
}

// 停止游戏计时器
function stopGameTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

// 游戏结束
function endGame() {
    stopGameTimer();
    const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
    recordGameData(currentGame, gameScore, elapsedTime);
    showGameResult(gameScore, elapsedTime);
}

// 示例游戏实现
// 这里添加一个简单的游戏实现，以便测试
function initSimpleGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>简单游戏示例</h2>
        <p>点击下面的按钮来获得分数！</p>
        <button onclick="addScore(10)" style="width: 200px; height: 80px; font-size: 24px; margin: 20px;">点击得分</button>
    `;
}

// 添加分数
function addScore(points) {
    gameScore += points;
    document.getElementById('game-score').textContent = gameScore;
}

// 模拟游戏完成
function completeGame() {
    endGame();
}

// 测试功能
function testFunction() {
    alert('测试功能正常工作！');
}