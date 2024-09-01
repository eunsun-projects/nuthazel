'use client'
import { useState, useEffect, useRef, useMemo} from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link';

export default function Search({searchDb, mobile}){

    const [searched, setSearched] = useState(false);
    const [searchString, setSearchString] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    // console.log(searchDb);
    const mergedSearchKeyword = useMemo(()=>{
        let arr = [];
        searchDb.forEach((e)=>{
            arr.push(...e.keywords)
        });
        return arr;
    },[searchDb]);

    // console.log(mergedSearchKeyword)

    const sanitizeInput = (input) => {
        return input.replace(/[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|]/gim, '');
    };

    function searching (searchString){
        if(searchString.length > 20){
            alert('20자 이내로 적어주세요.')
        } else{
            const sanitized = sanitizeInput(searchString);
            let searchResultArr = [];//최종 검색결과를 담을 어레이
            let nonbspSearchArr = [];//공백이 제거된 검색어를 담을 어레이

            // "/\s/"는 공백을 찾아주는 정규식!
            if(/\s/.test(sanitized)){
                nonbspSearchArr = sanitized.split(/\s/); //공백을 제거(split)해서 배열에 담음
                // nonbspSearchArr === ['gpu', 'eum']

                nonbspSearchArr.forEach((e)=>{
                    const result = mergedSearchKeyword.filter((a)=>{
                        return(
                            a.includes(e)
                        )
                    })
                    searchResultArr.push(...result);
                })
            }else{
                //인풋에 입력된 스트링을 받아서 결과값을 찾아라.
                searchResultArr = mergedSearchKeyword.filter((e, i)=>{
                    // console.log(e.keywords.includes(sanitized))
                    return(
                        e.includes(sanitized)
                    )
                })
            }

            // console.log(searchResultArr)

            if(searchResultArr.length === 0){
                setSearchResult([
                    {
                        keywords: '',
                        title: '검색 결과가 없습니다.',
                        pageurl: ''
                    }
                ])
            }else{
                let resultArr = [];
                searchResultArr.forEach((e)=>{
                    const mapped = searchDb.map((item) => {

                        const temp = item.keywords.filter(a => a.includes(e));

                        if(temp.length > 0){
                            return item;
                        }else{
                            return null;
                        }
                    })
                    resultArr = mapped.filter((e) => {
                        if(e !== null) return e;
                    });
                })

                setSearchResult(resultArr);
            }
        }
    };

    //input 값이 입력되면 입력값저장
    const handleInput = (e) => {
        // console.log(e.currentTarget.value)
        const string = e.currentTarget.value;
        const lower = string.toLowerCase(); // 모두 소문자로 변경
        setSearchString(lower);
    };

    //엔터가 입력되면 실행
    const handleKeydown = (e) => {
        //1. 엔터라면 (모든 자판이 키다운이니까)
        if(e.keyCode === 13){
            e.preventDefault(); //input에 기본동작들 금지.

            //핸들인풋에서 변경된함수가 null이 아니라면 - 뭔가 값이 있다면,
            if(searchDb && searchString){
                searching(searchString);
                setSearched(true);
            }
            e.currentTarget.blur(); // input focus out해라.
        }
    };

    //검색버튼 누르면 실행
    const handleSearchBtn = () => {
        //핸들인풋에서 변경된함수가 null이 아니라면 - 뭔가 값이 있다면,
        if(searchDb && searchString){
            searching(searchString);
            setSearched(true);
        }else {
            alert('검색어를 입력하세요');
        }
    };

    //검색결과로 이동하면 실행
    const handleLinkClick = () => {
        setSearched(false);
    };

    //검색모달 닫기
    const handleSearchModalClick = (e) => {
        if(e.target !== e.currentTarget.firstChild){
            setSearched(false);
        }
    };

    useEffect(()=>{
        console.log(searchResult)
    },[searchResult])

    return(
        <>
            {searched && (
                <div className={styles.searched} onClick={handleSearchModalClick}>
                    <div className={styles.searchedmodal}>
                        <div className={styles.searchtitle}>
                            <div className={styles.searchtitleimg}>
                                <img style={{width:'100%', height:'100%'}} src='/assets/main/dandelion.webp' alt='dandelion1'></img>
                            </div>
                            <p>검색결과</p>
                            <div className={styles.searchtitleimg}>
                                <img style={{width:'100%', height:'100%'}} src='/assets/main/dandelion.webp' alt='dandelion2'></img>
                            </div>
                        </div>
                        <div className={styles.searchrcontents}>
                        {searchResult.map((e,i) => (
                            <Link onClick={handleLinkClick} key={i} href={e.pageurl && e.pageurl} prefetch={false} scroll={false}>
                                <p className={styles.serchcontitle}>{e.title}</p>
                            </Link>
                        ))}
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.search}>
                <input type='search' name='search' placeholder='' onInput={handleInput} onKeyDown={handleKeydown} className={styles.searchinput}></input>
                <div className={styles.searchbtn} onClick={handleSearchBtn}>
                    <div className={styles.readingglasses}>
                        <div style={{display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                        <div className={styles.glassescircle}></div>
                            <div className={styles.glassesline}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}