---
title: "Understanding Transformers for Students"
description: "A student-friendly walkthrough of the transformer architecture: attention, encoders, decoders, training, and inference."
pubDate: 2023-06-11
tags: ["transformers", "nlp", "deep-learning", "machine-learning"]
canonicalUrl: "https://medium.com/@itsmariodias/understanding-transformers-for-students-71a1cb362218"
---

> Originally published on [Medium](https://medium.com/@itsmariodias/understanding-transformers-for-students-71a1cb362218).

## A brief history

Before transformers, NLP relied on recurrent neural networks (RNNs) that processed data sequentially. RNNs struggled with long sequences (they lost context over distance), and their sequential nature made training slow because work scaled linearly with input length. Attention mechanisms were introduced to help networks focus on the most relevant parts of an input and partially address these memory issues.

## Enter transformers

In 2017, the paper *Attention Is All You Need* (Vaswani et al.) introduced the transformer, which dropped RNNs entirely in favour of attention. The shift enabled far more parallelism during training and quickly produced state-of-the-art results. The central idea is **self-attention**, which lets the model relate every element of a sequence to every other element at once.

## Model architecture

Transformers use an **encoder–decoder** architecture:

- **Encoder**: turns the input sequence into a continuous representation.
- **Decoder**: generates the output sequence, using the encoder output and the tokens generated so far.

This generative loop is what makes transformers "generative models", though the same building blocks can be used in other ways.

## Embedding and positional encoding

### Embedding

Text must be converted to numbers before a model can work with it. Each token gets a unique id, which is then mapped to a vector called an *embedding*. Unlike fixed embeddings (e.g. GloVe), the transformer's embeddings are learned during training, so they can adapt to the task. Embedding vectors are scaled by `√d`, where `d` is the embedding dimension.

### Positional encoding

Because transformers don't process tokens in order, they have no built-in sense of position. Positional encodings inject that information by representing each token's position in the sequence using sine and cosine functions. They are added to the token embeddings before the data reaches the encoder or decoder.

## Attention

The paper defines attention as "mapping a query and a set of key–value pairs to an output." Intuitively:

- **Query (Q)**: what you are searching for.
- **Key (K)**: the categories of information available.
- **Value (V)**: the actual information.

### Scaled dot-product attention

The transformer uses *scaled dot-product attention*:

```text
Attention(Q, K, V) = softmax(Q · Kᵀ / √d) · V
```

The dot product of queries and keys is scaled by `√d`, passed through softmax to get a probability distribution, then used to take a weighted sum of the values. The result emphasises the values that are most relevant to each query.

## Multi-head attention

Instead of a single attention operation, the transformer runs several attention "heads" in parallel on linearly projected, lower-dimensional copies of Q, K, and V. This lets the model attend to information from different representation subspaces at the same time. The outputs from all heads are concatenated and linearly projected to produce the final result.

## Feed-forward networks

After each attention block, a small feed-forward network (a two-layer MLP) processes the output:

```text
FFN(x) = max(0, x · W₁ + b₁) · W₂ + b₂
```

The inner layer is typically four times the size of the input/output dimension. ReLU clips negative values, and dropout provides regularisation.

## Residual connections and normalisation

Each attention and feed-forward block is wrapped in a *residual connection* (the input is added to the output) followed by *layer normalisation*. Together these make the model much easier to train and improve final performance.

## The encoder layer

The encoder is a stack of N identical blocks. Each block:

1. Applies multi-head **self-attention** (Q, K, and V all come from the same source).
2. Passes the result through a feed-forward network.
3. Forwards the output to the next block.

Self-attention lets every token attend to every other token in parallel, so each token can build a strong contextual representation without the sequential limitations of RNNs or CNNs.

## The decoder layer

The decoder is also a stack of N blocks, with a slightly richer structure:

1. **Masked self-attention** prevents a token from attending to future positions.
2. **Cross-attention** uses the encoder output as K and V, and the decoder state as Q.
3. A **feed-forward network** processes the attention output.

### Masked self-attention

Masking guarantees that each token can only attend to the tokens before it. During training, the target sequence is shifted right (a `<START>` token is prepended) so the model can't peek at the token it's supposed to predict. This matches what happens at inference time, when future tokens genuinely aren't available yet.

## Training the transformer

For a task like machine translation:

- Both the source-language input and the target-language output are supplied.
- The target is shifted right so the model can't attend to future tokens.
- The model predicts a probability distribution over the vocabulary for every position.
- All positions are predicted in a single forward pass, because the whole target is known.
- Quality is measured with metrics like BLEU.

## At inference time

Inference is **autoregressive** and iterative:

1. Feed the decoder a `<START>` token along with the encoder output.
2. Generate the first output token.
3. Append it to the running output sequence.
4. Feed the new sequence back into the decoder.
5. Repeat until an `<END>` token is produced or the maximum length is hit.

This is different from training because the model no longer has access to the ground-truth future tokens, so it has to generate them one step at a time.

**Teacher forcing**: during training, feeding the model the actual correct token at each step (instead of whatever it just predicted) prevents early mistakes from compounding and helps it learn faster.

## Applications

Transformers now power a huge range of NLP tasks:

- Language modelling
- Machine translation
- Sentiment analysis
- Text classification
- Next-sentence prediction
- Paraphrasing
- Question answering

## Examples

The two best-known transformer-based models are:

- **BERT**: a bidirectional encoder that captures context from both directions.
- **GPT**: a generative decoder focused on text generation.

Both build on the core transformer architecture with modifications for their respective tasks.

## Final thoughts

This post is meant as a starting point. If you want to go deeper, read the original *Attention Is All You Need* paper and try implementing a small transformer in PyTorch or TensorFlow.

## References

- *Transformers Explained Visually*, Ketan Doshi
- *The Illustrated Transformer*, Michael Phi
- *Training the Transformer Model*, Machine Learning Mastery
- *Attention Is All You Need*, Vaswani et al.
- Transformer tutorial, TensorFlow
- Transformer tutorial, PyTorch
