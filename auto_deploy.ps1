# 자동 배포 스크립트 - 변경사항이 있으면 커밋 후 push
$repoPath = "C:\Users\lotte\Downloads\KIRO\LOTTE_AI_CCC"
$logFile = "$repoPath\deploy_log.txt"

Set-Location $repoPath

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# 변경사항 확인
$status = git status --porcelain

if ($status) {
    git add -A
    git commit -m "Auto deploy: $timestamp"
    git push origin main
    Add-Content $logFile "$timestamp - 배포 완료: 변경사항 push됨"
} else {
    Add-Content $logFile "$timestamp - 변경사항 없음, 스킵"
}
