(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{504:function(s,a,t){"use strict";t.r(a);var e=t(2),r=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"git-worktree的使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-worktree的使用"}},[s._v("#")]),s._v(" git worktree的使用")]),s._v(" "),a("h2",{attrs:{id:"使用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用场景"}},[s._v("#")]),s._v(" 使用场景")]),s._v(" "),a("ul",[a("li",[s._v("当项目正在运行时，想查看某个分支或者commit的代码时，不用停止")]),s._v(" "),a("li",[s._v("当你正在开发一个新功能（假设在 feat 分支上），突然需要修复 master 分支上的一个 bug 时，你可以使用 git worktree 来创建一个新的工作目录用于修复 bug，而不需要切换回原来的工作目录，这样可以同时进行两个工作流程。以下是具体的步骤和命令：")])]),s._v(" "),a("ol",[a("li",[a("p",[a("strong",[s._v("添加一个新的工作树用于修复 bug")]),s._v("：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/zlb-ums-center_wt1 master\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("这个命令会在上层目录创建一个名为 "),a("code",[s._v("zlb-ums-center_wt1")]),s._v(" 的新目录，并在其中检出 "),a("code",[s._v("master")]),s._v(" 分支，在上层创建避免影响当前代码库运行。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree list\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("这个命令会输出当前仓库所有的工作树和位置，可以用这个命令快速切换")])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("切换到新的工作树目录")]),s._v("：\n你可以通过 "),a("code",[s._v("cd")]),s._v(" 命令进入新创建的工作树目录或者直接用VSCode打开那个代码库，就和普通代码仓库一样，可以建立分支和提交：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/zlb-ums-center_wt1\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("修复 bug")]),s._v("：\n在新的工作树目录中，你可以进行 bug 修复所需的任何工作，比如：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-b")]),s._v(" fix-bug\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 做一些更改修复 bug")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-m")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Fix bug in master"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("推送修复到远程仓库")]),s._v("：\n修复完成后，你可以将修复推送到远程仓库：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push origin fix-bug\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("如果你想要将修复合并回 "),a("code",[s._v("master")]),s._v(" 分支，你可以在 "),a("code",[s._v("master")]),s._v(" 分支上执行：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge fix-bug\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push origin master\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("返回到原来的工作树")]),s._v("：\n修复 bug 并推送后，如果你想要回到原来的 "),a("code",[s._v("feat")]),s._v(" 分支上继续工作，你需要先返回到原来工作树的物理位置，然后切换回 "),a("code",[s._v("feat")]),s._v(" 分支：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/原来的工作树路径\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout feat\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("或者，如果你知道原来工作树的确切路径，可以直接使用：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /path/to/original/worktree\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout feat\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("清理（可选）")]),s._v("：\n如果你不再需要用于修复 bug 的工作树，可以将其删除以释放空间：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree remove bugfix-worktree\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])]),s._v(" "),a("p",[s._v("使用 "),a("code",[s._v("git worktree")]),s._v(" 可以让你在不同的分支上同时进行工作，而不需要合并或重新基线你的更改，这在需要快速在不同上下文之间切换时非常有用。")]),s._v(" "),a("h2",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[s._v("#")]),s._v(" 常用命令")]),s._v(" "),a("p",[a("code",[s._v("git worktree")]),s._v(" 是一个非常有用的 Git 功能，它允许你检查出同一个仓库的多个工作目录（working trees），这样你就可以在不同的工作目录中独立地进行开发，而不会相互干扰。以下是 "),a("code",[s._v("git worktree")]),s._v(" 的基本使用步骤和一些常见命令：")]),s._v(" "),a("h3",{attrs:{id:"创建新的工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建新的工作树"}},[s._v("#")]),s._v(" 创建新的工作树")]),s._v(" "),a("p",[s._v("使用 "),a("code",[s._v("git worktree add")]),s._v(" 命令可以在新的位置创建一个新的工作树，并检出特定的提交或分支：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("branch_or_commit"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[a("code",[s._v("<path>")]),s._v(" 是你希望创建新工作树的目录路径。")]),s._v(" "),a("li",[a("code",[s._v("<branch_or_commit>")]),s._v(" 是你希望检出到新工作树的分支或提交。")])]),s._v(" "),a("p",[s._v("如果不指定 "),a("code",[s._v("<branch_or_commit>")]),s._v("，默认会检出当前分支。")]),s._v(" "),a("h3",{attrs:{id:"列出所有工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#列出所有工作树"}},[s._v("#")]),s._v(" 列出所有工作树")]),s._v(" "),a("p",[s._v("要查看当前仓库中的所有工作树，可以使用：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree list\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("这会列出主工作树和所有链接的工作树，以及它们当前检出的提交和分支。")]),s._v(" "),a("h3",{attrs:{id:"移动工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#移动工作树"}},[s._v("#")]),s._v(" 移动工作树")]),s._v(" "),a("p",[s._v("如果你需要将一个工作树移动到另一个位置，可以使用 "),a("code",[s._v("git worktree move")]),s._v("：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree move "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("worktree"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("new-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"删除工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除工作树"}},[s._v("#")]),s._v(" 删除工作树")]),s._v(" "),a("p",[s._v("当不再需要某个工作树时，可以使用 "),a("code",[s._v("git worktree remove")]),s._v(" 命令将其删除：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree remove "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("worktree"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("只有干净的工作树（即没有未提交的更改和未跟踪的文件）才能被删除。如果有未提交的更改，可以使用 "),a("code",[s._v("--force")]),s._v(" 选项强制删除。")]),s._v(" "),a("h3",{attrs:{id:"锁定工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#锁定工作树"}},[s._v("#")]),s._v(" 锁定工作树")]),s._v(" "),a("p",[s._v("如果工作树位于移动存储或网络共享上，可能希望锁定它以防止自动修剪。可以使用 "),a("code",[s._v("git worktree lock")]),s._v(" 命令：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree lock "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("--reason "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("string"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("worktree"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"解锁工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解锁工作树"}},[s._v("#")]),s._v(" 解锁工作树")]),s._v(" "),a("p",[s._v("使用 "),a("code",[s._v("git worktree unlock")]),s._v(" 可以解锁一个工作树：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree unlock "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("worktree"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"修剪工作树信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修剪工作树信息"}},[s._v("#")]),s._v(" 修剪工作树信息")]),s._v(" "),a("p",[s._v("如果手动删除了工作树目录，可以使用 "),a("code",[s._v("git worktree prune")]),s._v(" 来修剪工作树信息：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree prune\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"修复工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修复工作树"}},[s._v("#")]),s._v(" 修复工作树")]),s._v(" "),a("p",[s._v("如果工作树的配置信息损坏，可以使用 "),a("code",[s._v("git worktree repair")]),s._v(" 来修复：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree repair "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"创建新分支并检出"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建新分支并检出"}},[s._v("#")]),s._v(" 创建新分支并检出")]),s._v(" "),a("p",[s._v("使用 "),a("code",[s._v("-b")]),s._v(" 选项可以创建并检出一个新的分支：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-b")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("new-branch"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("branch_or_commit"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"检出时不获取工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#检出时不获取工作树"}},[s._v("#")]),s._v(" 检出时不获取工作树")]),s._v(" "),a("p",[s._v("使用 "),a("code",[s._v("--no-checkout")]),s._v(" 选项可以在创建工作树时不检出任何内容，这在你想要自定义工作树（如配置稀疏检出）时非常有用：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" --no-checkout "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("branch_or_commit"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"强制创建工作树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#强制创建工作树"}},[s._v("#")]),s._v(" 强制创建工作树")]),s._v(" "),a("p",[s._v("即使 "),a("code",[s._v("<branch_or_commit>")]),s._v(" 是一个分支名，并且已经在另一个工作树中被检出，使用 "),a("code",[s._v("--force")]),s._v(" 选项可以强制创建一个新的工作树：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" worktree "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--force")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("branch_or_commit"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("这些是 "),a("code",[s._v("git worktree")]),s._v(" 的一些基本用法。它们可以帮助你更有效地管理多个开发环境，特别是在需要同时在多个分支上工作时。")])])}),[],!1,null,null,null);a.default=r.exports}}]);