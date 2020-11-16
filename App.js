import React from 'react'
import styled from 'styled-components/native';
import _ from 'lodash';
import movieList from './movieList';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.View` 
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const Button = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  background: #78e08f;
  justify-content: center;
  align-items: center;
`;
const Label = styled.Text`
  font-weight: bold;
  font-size: 25px;
  letter-spacing: 6px;
  color: #ffffff;
`;
const Quiz = styled.Text`
  font-weight: bold;
  font-size: 60px;
  text-align: center;
`;

// 초성추출
function getInitials(string){
  return string
    .split('')
    .map(char => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index>=0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join('');
}

export default function App() {
  const [quizList, setQuizList] = React.useState(_.shuffle(movieList));
  const [mode, setMode] = React.useState('quiz'); // quiz or answer
  const onPress = React.useCallback( () => {
    if (mode === 'answer'){
      setQuizList(quizList.slice(1));
    }
    setMode( mode === 'quiz' ? 'answer' : 'quiz' );
  }, [mode]) // 콜백으로 쓸 수 있는 함수를 생성

  const retry = React.useCallback( () => {
    setQuizList(_.shuffle(movieList));
    setMode('quiz');
  },[quizList])

  return (
    <>
    <Container>
      <Contents>
        { quizList.length ? (
          <Quiz>{ mode === 'quiz' ? getInitials(quizList[0]) : quizList[0] }</Quiz>
          )  : (
            <Quiz>수고하셨습니다 !</Quiz>
          )}
      </Contents>
        { quizList.length ? (
          <Button onPress={onPress}>
            <Label>{ mode === 'quiz' ? '정답 확인' : '다음' }</Label>
          </Button> 
        ) : (
          <Button onPress={retry}>
            <Label>다시 시작</Label>
          </Button>
        )}
      
    </Container>
    </>

  );
}
