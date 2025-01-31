const shareLink = () => {
  const inviteURL = window.location.href;

  console.log(inviteURL);
  const handleWebShare = async () => {
    const shareData = {
      meet: {
        title: "타로냥이",
        text: "귀여운 타로냥이가 봐주는 타로 보러 보러가기 \n",
        url: inviteURL,
      },
    };

    if (navigator.share) {
      navigator.share(shareData.meet);
    } else {
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      console.log(inviteURL);
      await navigator.clipboard.writeText(inviteURL);
    } catch {
      alert("링크복사에 실패했습니다. \n 다시 시도해주세요.");
    }
  };

  handleWebShare();
};

export default shareLink;
