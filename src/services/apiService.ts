export const getComments = ({
  user,
  page = 1,
  limit = 10,
}: {
  user?: string;
  page?: number;
  limit?: number;
}) => {
  const comments = [
    { id: 1, text: "This is a comment", user: "User1" },
    { id: 2, text: "This is another comment", user: "User2" },
    { id: 3, text: "This is yet another comment", user: "User1" },
    { id: 4, text: "A fourth comment", user: "User3" },
  ];

  // Filter by user if provided
  const filteredComments = user
    ? comments.filter((comment) => comment.user === user)
    : comments;

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const paginatedComments = filteredComments.slice(
    startIndex,
    startIndex + limit
  );

  return paginatedComments;
};

export const getThreads = ({ category }: { category?: string }) => {
  const threads = [
    {
      id: 1,
      title: "Thread 1",
      content: "This is the first thread",
      category: "General",
    },
    {
      id: 2,
      title: "Thread 2",
      content: "This is the second thread",
      category: "Feedback",
    },
    {
      id: 3,
      title: "Thread 3",
      content: "This is another thread",
      category: "General",
    },
  ];

  // Filter by category if provided
  const filteredThreads = category
    ? threads.filter((thread) => thread.category === category)
    : threads;

  return filteredThreads;
};

export const getReplies = ({ threadId }: { threadId?: number }) => {
  const replies = [
    { id: 1, reply: "This is a reply to thread 1", user: "User3", threadId: 1 },
    {
      id: 2,
      reply: "This is another reply to thread 1",
      user: "User4",
      threadId: 1,
    },
    { id: 3, reply: "This is a reply to thread 2", user: "User5", threadId: 2 },
  ];

  // Filter by threadId if provided
  const filteredReplies = threadId
    ? replies.filter((reply) => reply.threadId === threadId)
    : replies;

  return filteredReplies;
};
