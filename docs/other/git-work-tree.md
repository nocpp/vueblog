---
title: git worktree的使用
date: '2024-05-20'
sidebar: 'auto'
categories:
 - 杂项
tags:
 - git
publish: true
---

# git worktree的使用

## 使用场景
- 当项目正在运行时，想查看某个分支或者commit的代码时，不用停止
- 当你正在开发一个新功能（假设在 feat 分支上），突然需要修复 master 分支上的一个 bug 时，你可以使用 git worktree 来创建一个新的工作目录用于修复 bug，而不需要切换回原来的工作目录，这样可以同时进行两个工作流程。以下是具体的步骤和命令：

1. **添加一个新的工作树用于修复 bug**：
   ```bash
   git worktree add ../zlb-ums-center_wt1 master
   ```
   这个命令会在上层目录创建一个名为 `zlb-ums-center_wt1` 的新目录，并在其中检出 `master` 分支，在上层创建避免影响当前代码库运行。
   ```bash
   git worktree list
   ```
   这个命令会输出当前仓库所有的工作树和位置，可以用这个命令快速切换

2. **切换到新的工作树目录**：
   你可以通过 `cd` 命令进入新创建的工作树目录或者直接用VSCode打开那个代码库，就和普通代码仓库一样，可以建立分支和提交：
   ```bash
   cd ../zlb-ums-center_wt1
   ```

3. **修复 bug**：
   在新的工作树目录中，你可以进行 bug 修复所需的任何工作，比如：
   ```bash
   git checkout -b fix-bug
   # 做一些更改修复 bug
   git add .
   git commit -m "Fix bug in master"
   ```

4. **推送修复到远程仓库**：
   修复完成后，你可以将修复推送到远程仓库：
   ```bash
   git push origin fix-bug
   ```

   如果你想要将修复合并回 `master` 分支，你可以在 `master` 分支上执行：
   ```bash
   git checkout master
   git merge fix-bug
   git push origin master
   ```

5. **返回到原来的工作树**：
   修复 bug 并推送后，如果你想要回到原来的 `feat` 分支上继续工作，你需要先返回到原来工作树的物理位置，然后切换回 `feat` 分支：
   ```bash
   cd ../原来的工作树路径
   git checkout feat
   ```

   或者，如果你知道原来工作树的确切路径，可以直接使用：
   ```bash
   cd /path/to/original/worktree
   git checkout feat
   ```

6. **清理（可选）**：
   如果你不再需要用于修复 bug 的工作树，可以将其删除以释放空间：
   ```bash
   cd ..
   git worktree remove bugfix-worktree
   ```

使用 `git worktree` 可以让你在不同的分支上同时进行工作，而不需要合并或重新基线你的更改，这在需要快速在不同上下文之间切换时非常有用。

## 常用命令
`git worktree` 是一个非常有用的 Git 功能，它允许你检查出同一个仓库的多个工作目录（working trees），这样你就可以在不同的工作目录中独立地进行开发，而不会相互干扰。以下是 `git worktree` 的基本使用步骤和一些常见命令：

### 创建新的工作树
使用 `git worktree add` 命令可以在新的位置创建一个新的工作树，并检出特定的提交或分支：

```bash
git worktree add <path> <branch_or_commit>
```

- `<path>` 是你希望创建新工作树的目录路径。
- `<branch_or_commit>` 是你希望检出到新工作树的分支或提交。

如果不指定 `<branch_or_commit>`，默认会检出当前分支。

### 列出所有工作树
要查看当前仓库中的所有工作树，可以使用：

```bash
git worktree list
```

这会列出主工作树和所有链接的工作树，以及它们当前检出的提交和分支。

### 移动工作树
如果你需要将一个工作树移动到另一个位置，可以使用 `git worktree move`：

```bash
git worktree move <worktree> <new-path>
```

### 删除工作树
当不再需要某个工作树时，可以使用 `git worktree remove` 命令将其删除：

```bash
git worktree remove <worktree>
```

只有干净的工作树（即没有未提交的更改和未跟踪的文件）才能被删除。如果有未提交的更改，可以使用 `--force` 选项强制删除。

### 锁定工作树
如果工作树位于移动存储或网络共享上，可能希望锁定它以防止自动修剪。可以使用 `git worktree lock` 命令：

```bash
git worktree lock [--reason <string>] <worktree>
```

### 解锁工作树
使用 `git worktree unlock` 可以解锁一个工作树：

```bash
git worktree unlock <worktree>
```

### 修剪工作树信息
如果手动删除了工作树目录，可以使用 `git worktree prune` 来修剪工作树信息：

```bash
git worktree prune
```

### 修复工作树
如果工作树的配置信息损坏，可以使用 `git worktree repair` 来修复：

```bash
git worktree repair <path>...
```

### 创建新分支并检出
使用 `-b` 选项可以创建并检出一个新的分支：

```bash
git worktree add -b <new-branch> <path> <branch_or_commit>
```

### 检出时不获取工作树
使用 `--no-checkout` 选项可以在创建工作树时不检出任何内容，这在你想要自定义工作树（如配置稀疏检出）时非常有用：

```bash
git worktree add --no-checkout <path> <branch_or_commit>
```

### 强制创建工作树
即使 `<branch_or_commit>` 是一个分支名，并且已经在另一个工作树中被检出，使用 `--force` 选项可以强制创建一个新的工作树：

```bash
git worktree add --force <path> <branch_or_commit>
```

这些是 `git worktree` 的一些基本用法。它们可以帮助你更有效地管理多个开发环境，特别是在需要同时在多个分支上工作时。