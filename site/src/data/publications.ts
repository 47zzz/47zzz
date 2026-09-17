export type Publication = {
  id: string; title: string; authors: string; year: number;
  kind: 'reviewed' | 'preprint'; venue: string; status: string;
  firstAuthor?: boolean; selected?: boolean;
  links: { label: string; href: string }[];
};
// Transcribed from the supplied CV; review status is never inferred from a year.
export const publications: Publication[] = [
  { id: 'move', title: 'MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation', authors: 'S.-C. Chen, I.-N. Tsai, Y.-C. Lin, S.-F. Huang, and H.-y. Lee', year: 2026, kind: 'reviewed', venue: 'Interspeech 2026', status: 'Accepted · Poster', firstAuthor: true, selected: true, links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2604.17435' }, { label: 'Code', href: 'https://github.com/47zzz/MoVE' }] },
  { id: 'speaker', title: 'Low EER Does Not Mean Human-Like: Effective Dimensionality Predicts Perceptual Alignment of Speaker Embeddings Without Human Labels', authors: 'S.-C. Chen, J.-K. Dong, Y.-C. Lin, S.-F. Huang, and H.-y. Lee', year: 2026, kind: 'preprint', venue: 'ICASSP 2027', status: 'Under review', firstAuthor: true, selected: true, links: [] },
  { id: 'teaching-monster', title: 'Findings of the First Teaching Monster Challenge: A Benchmark of Pedagogical Content Knowledge in AI Agents', authors: 'Y.-C. Lin, Y.-K. Guo, S.-C. Chen, et al., and H.-y. Lee', year: 2026, kind: 'preprint', venue: 'arXiv', status: 'Preprint', links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2608.08852' }, { label: 'Demo', href: 'https://47zzz.github.io/text2teacher/' }] },
  { id: 'tau', title: 'TAU: A Benchmark for Cultural Sound Understanding Beyond Semantics', authors: 'Y.-C. Lin, Y.-H. Chen, J.-K. Dong, Y.-H. Huang, S.-C. Chen, et al., and H.-y. Lee', year: 2025, kind: 'reviewed', venue: 'ICASSP 2026', status: 'Accepted · Poster', selected: true, links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2509.26329' }] },
  { id: 'emotional-scenes', title: 'Differential Behavioral Manifestations in Emotional versus Neutral Scene Perception within Convolutional Neural Networks', authors: 'C.-H. Li, S.-C. Chen, and B.-C. Kuo', year: 2024, kind: 'reviewed', venue: 'CCN 2024', status: 'Poster', links: [] },
];
