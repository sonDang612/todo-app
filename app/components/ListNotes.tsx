import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { UserNote } from '../types';
import Note from './Note';
type Props = {
  userNotes: UserNote[];
  deleteNote: (deletedNoteId: string) => void;
};
const ListNotes = (props: Props) => {
  const { userNotes, deleteNote } = props;
  const renderItem: ListRenderItem<UserNote> = React.useCallback(
    ({ item: userNote }) => {
      return <Note userNote={userNote} deleteNote={deleteNote} />;
    },
    [deleteNote],
  );
  return <FlatList data={userNotes} renderItem={renderItem} />;
};

export default React.memo(ListNotes);
