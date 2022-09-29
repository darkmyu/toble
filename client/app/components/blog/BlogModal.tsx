import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CancelIcon from '../../assets/cancel.svg';
import { black, personal } from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { useBlogModal } from './hooks/useBlogModal';
import Input from './Input';
import Select from './Select';

function BlogModal() {
  const {
    isActive,
    inputDescriptions,
    inputErrorMessages,
    register,
    handleSubmit,
    errors,
    onSubmitInputs,
    onClickCancel,
    topics,
  } = useBlogModal();

  const {
    usernameTitle,
    usernameDescription,
    usernamePlaceholder,
    nameTitle,
    nameDescription,
    namePlaceholder,
    topicTitle,
    topicDescription,
  } = inputDescriptions;

  const { requiredMessage, maxLengthMessage, patternMessage } = inputErrorMessages;

  if (!isActive) return <></>;

  return (
    <>
      <Block />
      <Wrapper isActive>
        <Box>
          <Top>
            <h1>Toble</h1>
            <button onClick={onClickCancel}>
              <CancelIcon />
            </button>
          </Top>
          <Form onSubmit={handleSubmit(onSubmitInputs)}>
            <FormGroup>
              <Section>
                <Title>{usernameTitle}</Title>
                <Description>{usernameDescription}</Description>
                <Input
                  placeholder={usernamePlaceholder}
                  errorMessage={errors.username?.message || null}
                  {...register('username', {
                    required: { value: true, message: requiredMessage },
                    maxLength: { value: 30, message: maxLengthMessage },
                    pattern: { value: /^[a-z0-9\_]+$/, message: patternMessage },
                  })}
                />
              </Section>
              <Section>
                <Title>{nameTitle}</Title>
                <Description>{nameDescription}</Description>
                <Input
                  placeholder={namePlaceholder}
                  errorMessage={errors.title?.message || null}
                  {...register('title', { required: { value: true, message: requiredMessage } })}
                />
              </Section>
              <Section>
                <Title>{topicTitle}</Title>
                <Description>{topicDescription}</Description>
                <Select
                  topics={topics || null}
                  errorMessage={errors.blogTopicId?.message || null}
                  {...register('blogTopicId', {
                    required: { value: true, message: requiredMessage },
                  })}
                />
              </Section>
            </FormGroup>
            <Bottom>
              <Button>블로그 만들기</Button>
            </Bottom>
          </Form>
        </Box>
      </Wrapper>
    </>
  );
}

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: black;
  z-index: 100;
`;

const Wrapper = styled.div<{ isActive: boolean }>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 200;
  animation: ${props =>
    props.isActive &&
    css`
      ${transitions.popInUp} 0.5s forwards ease-in-out
    `};
`;

const Box = styled.div`
  width: 530px;
  background: white;
  border-radius: 20px;
  position: relative;
`;

const Top = styled.div`
  h1 {
    color: ${black[900]};
    text-align: center;
    margin: 0;
    font-size: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  button {
    position: absolute;
    top: 2%;
    right: 0;
    border: none;
    background: none;
    padding: 1rem;
    cursor: pointer;
  }
`;

const Form = styled.form`
  padding-top: 6rem;
  padding-bottom: 6rem;
  margin-left: 5rem;
  margin-right: 5rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 5rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 48px;
  background: ${personal[900]};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const FormGroup = styled.div`
  font-weight: bold;
`;

const Section = styled.section`
  & + & {
    margin-top: 3rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
  color: ${black[800]};
`;

const Description = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  color: ${black[500]};
  margin-top: 0.25rem;
`;

export default BlogModal;
