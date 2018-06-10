// @flow

import type Dataloader from 'dataloader';

type Key = string;

export type Dataloaders = {
  BookLoader: Dataloader<Key, *>,
};

export type GraphQLContext = {
  req: Object,
  dataloaders: Dataloaders,
};
