const shareLink = () => {
  const inviteURL = window.location.href;

  console.log(inviteURL);
  const handleWebShare = async () => {
    const shareData = {
      meet: {
        title: "타로냥 - 고양이 타로술사 \n",
        text: "고양이 타로술사 타로냥이 당신의 질문에 답해주는 AI 타로 서비스입니다. \n",
        url: inviteURL,
      },
    };

    if (navigator.share) {
      await navigator.share(shareData.meet);
      return true;
    } else {
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      console.log("복사성공");
      await navigator.clipboard.writeText(inviteURL);
      return true;
    } catch {
      alert("링크복사에 실패했습니다. \n 다시 시도해주세요.");
      return false;
    }
  };
  return { handleWebShare, handleCopyToClipboard };
};

export default shareLink;
