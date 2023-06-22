export type ElasticSearchResponse = {
  detail: {
    custom_analyzer: boolean;
    charfilters: [];
    tokenizer: { name: 'nori_tokenizer'; tokens: NoriToken[] };
    tokenfilters: [];
  };
};

export type NoriToken = {
  token: string;
  start_offset: number;
  end_offset: number;
  type: string;
  position: number;
  bytes: string;
  leftPOS: string;
  morphemes: null;
  posType: string;
  positionLength: number;
  reading: null;
  rightPOS: string;
  termFrequency: number;
};

export type KeywordMap = {
  [keyword: string]: number;
};
