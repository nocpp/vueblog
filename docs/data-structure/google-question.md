---
title: 谷歌真题
date: '2021-11-17'
sidebar: 'auto'
categories:
 - 数据结构
tags:
 - 谷歌真题
publish: true
---

> 此章题目类型是看起来和代码没什么关系，题目文字多，看了一遍不知道题目在讲什么的题。而我们需要的是将题目翻译成代码形式，然后就可以用熟悉的模型去解决此类问题。总结，这种题目考察的是抽象能力，把实际问题抽象为模型。

## 岛屿数量问题
> 题目描述：给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。此外，你可以假设该网格的四条边均被水包围。

:::tip
示例 1:

输入:  
11110  
11010  
11000  
00000  
输出: 1

示例 2:

输入:  
11000
11000
00100
00011  
输出: 3
:::

> 思路分析，看了几遍题目，理解了二维网格就是一个二维数组，里面元素就是0和1，但是岛屿的概念一直没读懂，看了分析才明白，岛屿就是连着的1组成的陆地，在示例1中所有的1都连在一起的，所以只有1个岛屿。示例2中，左上角4个1，中间一个1，右下两个1分别组成3块陆地。

> 所以此题可以转化为输入一个n*m的二维数组，数组元素由0，1组成，求连着的1有几块儿
```js
var numIslands = function(grid) {
    let moveX = [0, 1, 0, -1], moveY = [1, 0, -1, 0];//通过这两个数组就可以找到一个元素的上下左右元素

    if (!grid || grid.length === 0 || grid[0].length === 0) {//过滤边界条件
        return 0;
    }

    let row = grid.length, column = grid[0].length;

    let count = 0;//定义个数

    for (let i = 0; i < row; i++) {//遍历二维数组
        for (let j = 0; j < column; j++) {
            if (grid[i][j] === '1') {
                dfs(grid, i, j);
                count++;
            }
        }
    }

    return count;
	
	//把所有相连的为1的元素设置为0
    function dfs(grid, i, j) {
		//注意条件是i >= row而不是i > row, 相等也不行
        if (i < 0 || i >= row || j < 0 || j >= column || grid[i][j] === '0') {
            return;
        }

        grid[i][j] = '0';

        for (let k = 0; k < 4; k++) {
            dfs(grid, moveX[k] + i, moveY[k] + j);
        }
    }
};
```

## 扫地机器人问题
题目描述：房间（用格栅表示）中有一个扫地机器人。格栅中的每一个格子有空和障碍物两种可能。扫地机器人提供4个API，可以向前进，向左转或者向右转。每次转弯90度。当扫地机器人试图进入障碍物格子时，它的碰撞传感器会探测出障碍物，使它停留在原地。.请利用提供的4个API编写让机器人清理整个房间的算法。
```js
interface Robot {
  // 若下一个方格为空，则返回true，并移动至该方格
  // 若下一个方格为障碍物，则返回false，并停留在原地
  boolean move();

  // 在调用turnLeft/turnRight后机器人会停留在原位置
  // 每次转弯90度
  void turnLeft();
  void turnRight();

  // 清理所在方格
  void clean();
}
```
- 扫地机器人的初始位置一定是空地
- 扫地机器人的初始方向向上。
- 所有可抵达的格子都是相连的，亦即所有标记为1的格子机器人都可以抵达。
- 可以假定格栅的四周都被墙包围。

> 思路分析，这道题和上一题有点像，范围都是二维数组，由0，1组成，不过本题的1肯定是连起来的，相当于上题的只有一块陆地。需要扫整个房间，所以需要用递归，判断每个格子。

> 机器人运动由方向决定，四个方向，不同方向前进的格子不同，可以用循环完成

```js
function robotMove(robot) {
	//用Set保存去过哪些格子，如果去过就跳过
	const boxSet = new Set();
	let dir = 0;
	
	dfs(robot, boxSet, 0, 0, 0);
	
	function dfs(robot, boxSet, i, j, dir) {
		let box = i + '+' + j;
		
		if (boxSet.has(box)) {
			return;
		}
		
		robot.clean();
		
		boxSet.add(box);
		
		for (let k = 0; k < 4; k++) {
			if (robot.move()) {//如果可以移动，计算下个格子坐标
				let x = i, y = j;
				switch (dir) {//顺时针角度，0度向上
					case 0:
						x = i - 1;
						break;
					case 90:
						y = j + 1;
						break;
					case 180:
						x = i + 1;
						break;
					case 270:
						y = j - 1;
						break;
				}
				dfs(robot, boxSet, x, y, dir);
				
				//递归碰到障碍物，返回上一格
				robot.turnLeft();
				robot.turnLeft();
				robot.move();
				robot.turnRight();
				robot.turnRight();
			}
			
			//如果移不动，或者移动完了返回了就换方向继续前进
			robot.turnRight() 
			dir += 90;
			dir %= 360;
		}
	}
}
```

## “合并区间”问题
题目描述：给出一个区间的集合，请合并所有重叠的区间。
> 示例 1:
输入: [[1,3],[2,6],[8,10],[15,18]] 
输出: [[1,6],[8,10],[15,18]] 
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6] 
> 示例 2:
输入: [[1,4],[4,5]] 
输出: [[1,5]] 
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。 

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    //双循环比较法
    for (let i = 0; i < intervals.length; i++) {
        for (let j = 0; j < intervals.length; j++) {
            if (i !== j && isOverlapped(intervals[i], intervals[j])) {
                const meargedItem = mergeRange(intervals[i], intervals[j]);
                intervals[i] = meargedItem;
                intervals.splice(j, 1);
                i--;
                break;
            }
        }
    }

	//是否重叠
    function isOverlapped(arr1, arr2) {
        return !(arr1[0] > arr2[1] || arr1[1] < arr2[0]);
    }
	//合并区间
    function mergeRange(arr1, arr2) {
        const min = arr1[0] < arr2[0] ? arr1[0] : arr2[0];
        const max = arr1[1] > arr2[1] ? arr1[1] : arr2[1];

        return [min, max];
    }

    return intervals;
};
```

```js
//数学规律法
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals || intervals.length === 0) {
        return [];
    }

    let res = [];
    intervals.sort((a, b) => a[0] - b[0]);//区间类题目可以先排序，然后找规律，发现只要前一个元素上界大于等于下一个元素下界，他们就有交集

    res.push(intervals[0]);

    for (let i = 1; i < intervals.length; i++) {
        if (res[res.length - 1][1] >= intervals[i][0]) {
            res[res.length - 1][1] = Math.max(intervals[i][1], res[res.length - 1][1]);
        } else {
            res.push(intervals[i]);
        }
    }

    return res;
};
```