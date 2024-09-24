import {useState} from "react";
import "./MazeGrid.css";
import Card from "./Card.jsx";


export default function MazeGrid() {

    // let initialMaze = [
    //     ['start', 'path', 'path', 'wall', 'wall', 'wall'],
    //     ['wall', 'wall', 'path', 'wall', 'wall', 'wall'],
    //     ['wall', 'wall', 'path', 'wall', 'wall', 'wall'],
    //     ['wall', 'wall', 'wall', 'path', 'path', 'path'],
    //     ['wall', 'wall', 'wall', 'wall', 'wall', 'path'],
    //     ['wall', 'wall', 'wall', 'wall', 'wall', 'end'],
    // ];
    const w = 17;
    const h = 11;

    let initialMaze = [];
    for (let i = 0; i < h; i++) {
        let row = [];
        for (let j = 0; j < w; j++) {
            row.push('wall');
        }
        initialMaze.push(row);
    }

    const [width, setWidth] = useState(initialMaze[0].length);
    const [height, setHeight] = useState(initialMaze.length);

    const [maze, setMaze] = useState(initialMaze);
    const [timeoutIdList, setTimeoutIdList] = useState([]);

    // Breadth-First Search
    // 1. Select node to process
    // 2. Loop through neighbours
    //    a. Set as visited
    //    b. Push to queue
    //


    // bfd use js-set data structure to store the visited cell information
    //     because we can check if an element is in a set very easily
    // [0,1] in set we put it as '1,0'
    function bfs(startNode) {
        let queue = [startNode];

        let visited = new Set(`${startNode[0]},${startNode[1]}`);

        function visitCell([x, y]) {

            setMaze((prevMaze) => prevMaze.map((row, rowIndex) =>
                row.map((cell, cellIndex) => {
                    if (rowIndex === y && cellIndex === x) {
                        return cell === 'end' ? 'end' : "visited";
                    }
                    return cell;
                })
            ))
            if (maze[y][x] === 'end') {
                console.log('Path Found!')
                //alert('Path Found!')
                return true
            }
            return false
        }

        // step will be call every time we Select a new node to process
        function step() {
            if (queue.length === 0) {
                return;
            }
            const [x, y] = queue.shift()
            console.log('after queue.shift, (x,y)==>(' + x + ',' + y + ')')
            console.log("new step")
            const dirs = [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0]
            ];

            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
                    visited.add(`${nx},${ny}`);

                    if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
                        if (visitCell([nx, ny])) {
                            return true;
                        }
                        queue.push([nx, ny]);
                    }

                }
            }
            //step();
            const timeoutId = setTimeout(step, 150);
            setTimeoutIdList((oldList) => [...oldList, timeoutId]);
        }

        step();

        // return true/false
        return false;
    }

    // dfd use js-set data structure to store the visited cell information
    //     because we can check if an element is in a set very easily
    // [0,1] in set we put it as '1,0'
    function dfs(startNode) {
        let stack = [startNode];

        let visited = new Set(`${startNode[0]},${startNode[1]}`);

        function visitCell([x, y]) {

            setMaze((prevMaze) => prevMaze.map((row, rowIndex) =>
                row.map((cell, cellIndex) => {
                    if (rowIndex === y && cellIndex === x) {
                        return cell === 'end' ? 'end' : "visited";
                    }
                    return cell;
                })
            ))
            if (maze[y][x] === 'end') {
                console.log('Path Found!')
                //alert('Path Found!')
                return true
            }
            return false
        }

        // step will be call every time we Select a new node to process
        function step() {
            if (stack.length === 0) {
                return;
            }
            const [x, y] = stack.pop()
            console.log('after stack.pop, (x,y)==>(' + x + ',' + y + ')')
            console.log("new step")
            const dirs = [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0]
            ];

            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
                    visited.add(`${nx},${ny}`);

                    if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
                        if (visitCell([nx, ny])) {
                            return true;
                        }
                        stack.push([nx, ny]);
                    }

                }
            }
            //step();
            const timeoutId = setTimeout(step, 50);
            setTimeoutIdList((oldList) => [...oldList, timeoutId]);
        }

        step();

        // return true/false
        return false;
    }


    function generateMaze(width, height) {
        let matrix = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push('wall');
            }
            matrix.push(row);
        }


        const dirs = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ];


        function isCellValid(x, y) {
            return y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === 'wall';
        }

        function carvePath(x, y) {

            matrix[y][x] = 'path';

            // shaffal dirs
            const directions = dirs.sort(() => Math.random() - 0.5);

            for (let [dx, dy] of directions) {
                const nx = x + dx * 2; // look one more ahead in same direction
                const ny = y + dy * 2; //  (only one of dx or dy is not zero)

                if (isCellValid(nx, ny)) {
                    matrix[y + dy][x + dx] = 'path';
                    carvePath(nx, ny);
                }

            }
        }

        carvePath(1, 1)
        matrix[1][0] = 'start';
        matrix[height - 2][width - 1] = 'end';

        console.log(matrix);
        setWidth(matrix[0].length);
        setHeight(matrix.length);
        setMaze(matrix);
    }

    function refreshMaze() {
        // clear all timeout handlers in timeoutIdList to fully stop each process on going.
        timeoutIdList.forEach(clearTimeout);
        setTimeoutIdList([]);
        generateMaze(width, height);
    }

    return (
        <>
            <div className={"maze-grid"}>
                <div className={"button-row"}>
                    <button className={"maze-button"} onClick={() => refreshMaze()}>refresh</button>
                    <button className={"maze-button"} onClick={() => bfs([1, 0])}>BFS</button>
                    <button className={"maze-button"} onClick={() => dfs([1, 0])}>DFS</button>
                </div>
                <div className={"maze"}>
                    {maze.map((row, _) => (
                        <div className={"row"}>
                            {row.map((cell, _) => (
                                <div className={`cell ${cell}`}></div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
            <Card></Card>
        </>
    );
}
