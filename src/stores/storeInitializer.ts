import GridStore from './gridStore';

export default function initializeStores(): any {
  return {
    gridStore: new GridStore(),
  };
}
