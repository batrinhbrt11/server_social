module.exports = (stt) => {
    return {
      id: stt.id,
      content: stt.content,
      body: {
        feelings: stt.body.feelings,
        with: stt.body.with.map((user) => ({
          id: user._id,
          name: user.name,
        })),
        at: stt.body.at,
        date: stt.body.date,
      },
      image: stt.image,
      isProfilePost: stt.isProfilePost,
      profilePostData: stt.profilePostData,
      privacy: stt.privacy,
      createdAt: stt.createdAt,
      likes: stt.likes,
      user: {
        id: stt.user._id,
        name: stt.user.name,
        active: stt.user.active,
        profile_pic: stt.user.profile_pic,
      },
    }
  }