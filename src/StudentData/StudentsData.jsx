import React, { useEffect, useState } from "react";
import styles from "./studentsdata.module.css";
import { arr } from "../DummyData/DummyData";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank, MdOutlineFileDownload } from "react-icons/md";

const StudentsData = () => {
  const [sortedArr, setSortedArr] = useState([...arr]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortPlacement, setsortPlacement] = useState("ascen");
  const [sortReviews, setsortReviews] = useState("ascen");

  const Sorting = () => {
    const sorted = [...arr].sort((a, b) => {
      if (sortDirection === "asc") {
        return parseInt(a.courseFees.amount) - parseInt(b.courseFees.amount);
      } else {
        return parseInt(b.courseFees.amount) - parseInt(a.courseFees.amount);
      }
    });
    setSortedArr(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  //   placement sorting
  const SortingPlacement = () => {
    const sorted = [...arr].sort((a, b) => {
      if (sortPlacement === "ascen") {
        return parseInt(a.placement.avg) - parseInt(b.placement.avg);
      } else {
        return parseInt(b.placement.avg) - parseInt(a.placement.avg);
      }
    });
    setSortedArr(sorted);
    setsortPlacement(sortPlacement === "ascen" ? "descen" : "ascen");
  };
  //   reviews sorting
  const SortingReviews = () => {
    const sorted = [...arr].sort((a, b) => {
      if (sortReviews === "ascen") {
        return parseFloat(a.userReviews.rating) - parseFloat(b.userReviews.rating);
      } else {
        return parseFloat(b.userReviews.rating) - parseFloat(a.userReviews.rating);
      }
    });
    setSortedArr(sorted);
    setsortReviews(sortReviews === "ascen" ? "descen" : "ascen");
  };

  //   searching
  const [searchText, setsearchText] = useState("");
  const handleSearch = (event) => {
    setsearchText(event.target.value);
  };

  useEffect(() => {
    const filtered = arr.filter((elem) => {
      return elem?.college?.name?.toLowerCase()?.includes(searchText?.toLowerCase());
    });
    setSortedArr(filtered);
  }, [searchText, arr]);

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem 1rem 2rem" }}>
          <input
            type="text"
            onChange={handleSearch}
            value={searchText}
            placeholder="Search College Name"
            style={{ padding: "0.4rem 1.2rem 0.4rem 0.3rem", borderRadius: "6px", border: "none", boxShadow: "1px 1px 2px 2px#a3a1a1", userSelect: "none" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
          {/* for heading */}
          <div style={{ display: "flex", paddingLeft: "2rem", paddingRight: "2rem", backgroundColor: "#7ccccc" }}>
            <div className={styles.headName} style={{ width: "5%" }}>
              CD Rank
            </div>
            <div className={styles.headName} style={{ width: "35%" }}>
              Colleges
            </div>
            <div className={styles.headName} style={{ width: "15%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>Course Fees</div>
              {sortDirection === "asc" ? (
                <FaAngleDown style={{ cursor: "pointer", paddingRight: "0.6rem" }} onClick={Sorting} />
              ) : (
                <FaAngleUp style={{ cursor: "pointer", paddingRight: "0.6rem" }} onClick={Sorting} />
              )}
            </div>
            <div className={styles.headName} style={{ width: "15%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>Placement</div>
              {sortPlacement === "ascen" ? (
                <FaAngleDown style={{ cursor: "pointer", paddingRight: "0.6rem" }} onClick={SortingPlacement} />
              ) : (
                <FaAngleUp style={{ cursor: "pointer", paddingRight: "0.6rem" }} onClick={SortingPlacement} />
              )}
            </div>
            <div className={styles.headName} style={{ width: "15%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>User Reviews</div>
              {sortReviews === "ascen" ? (
                <FaAngleDown style={{ cursor: "pointer", paddingRight: "0.6rem" }} onClick={SortingReviews} />
              ) : (
                <FaAngleUp style={{ cursor: "pointer", paddingRight: "0.6rem" }} onClick={SortingReviews} />
              )}
            </div>
            <div className={styles.headName} style={{ borderRight: "none", width: "15%" }}>
              Ranking
            </div>
          </div>

          <div>
            {sortedArr.map((elem) => {
              return (
                <>
                  {/* for details */}
                  <div style={{ display: "flex", paddingLeft: "2rem", paddingRight: "2rem", background: "#fffefe", borderBottom: "1px solid rgb(236, 235, 235)" }}>
                    <div className={styles.detailsText} style={{ width: "5%" }}>
                      {elem.cdRank}
                    </div>
                    <div className={styles.detailsText} style={{ width: "35%" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <div>{elem.college.logo}</div>
                        <div style={{ lineHeight: "1.1rem" }}>
                          <div style={{ color: "#6ed2f4", fontWeight: "600" }}>{elem.college.name}</div>
                          <div style={{ fontSize: "10px", fontWeight: "500", color: "#a3a1a1" }}>{elem.college.location}</div>
                          <div
                            style={{
                              backgroundColor: "#fcf2de",
                              marginTop: "0.3rem",
                              borderTopRightRadius: "8px",
                              borderBottomRightRadius: "8px",
                              padding: "0.2rem 1rem 0.2rem 0.5rem",
                              borderLeft: "3px solid #f49d1a",
                            }}
                          >
                            <div style={{ color: "#f49d1a", fontSize: "12px", fontWeight: 600 }}>{elem.college.field}</div>
                            <div style={{ fontSize: "11px", color: "#a3a1a1" }}>{elem.college.field2}</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#f49d1a", fontSize: "12px" }}>
                          <FaArrowRight />
                          Apply Now
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#16c69a", fontSize: "12px" }}>
                          <MdOutlineFileDownload />
                          Download Brochure
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#575757", fontSize: "12px" }}>
                          <MdCheckBoxOutlineBlank />
                          Add To Compare
                        </div>
                      </div>
                    </div>
                    <div className={styles.detailsText} style={{ width: "15%" }}>
                      <div style={{ lineHeight: "1.4rem" }}>
                        <div style={{ color: "#53b69f", fontWeight: "bold", fontSize: "14px" }}>₹{elem.courseFees.amount}</div>
                        <div style={{ fontWeight: "600", fontSize: "11px", color: "#a3a1a1" }}>{elem.courseFees.course}</div>
                        <div style={{ fontWeight: "500", fontSize: "11px", color: "#a3a1a1" }}>-{elem.courseFees.yr}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: " #FFA500", fontSize: "11px", fontWeight: "600" }}>
                          <RiArrowLeftRightFill />
                          {elem.courseFees.compare}
                        </div>
                      </div>
                    </div>
                    <div className={styles.detailsText} style={{ width: "15%" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        <div>
                          <div style={{ color: "#53b69f", fontWeight: "bold", fontSize: "14px" }}>₹{elem.placement.avg}</div>
                          <div style={{ fontWeight: "600", fontSize: "10px", color: "#a3a1a1" }}>Average Package</div>
                        </div>
                        <div>
                          <div style={{ color: "#53b69f", fontWeight: "bold", fontSize: "14px" }}>{elem.placement.high}</div>
                          <div style={{ fontWeight: "600", fontSize: "10px", color: "#a3a1a1" }}>Highest Package</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: " #FFA500", fontSize: "11px", fontWeight: "600" }}>
                          <RiArrowLeftRightFill />
                          {elem.placement.compare}
                        </div>
                      </div>
                    </div>
                    <div className={styles.detailsText} style={{ width: "15%" }}>
                      <div style={{ lineHeight: "1.1rem" }}>
                        <div style={{ fontWeight: "600", fontSize: "14px", color: "#6d6c6c" }}>{elem.userReviews.rating}/10</div>
                        <div style={{ fontWeight: "600", fontSize: "11px", color: "#a3a1a1" }}>{elem.userReviews.user}</div>
                        <div style={{ fontWeight: "600", fontSize: "11px", color: "#a3a1a1" }}>{elem.userReviews.review}</div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2rem",
                            fontSize: "11px",
                            color: "#FF69B4",
                            backgroundColor: "#fcf2de",
                            borderRadius: "9px",
                            marginTop: "0.3rem",
                            width: "fit-content",
                            padding: "0.1rem 0.7rem 0.2rem 0.7rem",
                          }}
                        >
                          <IoMdCheckmark style={{ marginTop: "0.1rem" }} />
                          {elem.userReviews.social}
                          <FaAngleDown style={{ marginTop: "0.2rem" }} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.detailsText} style={{ borderRight: "none", width: "15%" }}>
                      <div style={{ lineHeight: "1.4rem" }}>
                        <div style={{ fontWeight: "600", fontSize: "14px", color: "#6d6c6c" }}>
                          {elem.ranking.rank}/ <span style={{ color: "#e19f35" }}>131</span> in India
                        </div>
                        <div style={{ fontWeight: "600", fontSize: "12px", color: "#a3a1a1" }}>{elem.ranking.year}</div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#44b2d3",
                            background: "#cff3ff",
                            fontWeight: "600",
                            width: "fit-content",
                            borderTopRightRadius: "6px",
                            borderBottomRightRadius: "6px",
                            padding: "0.2rem 1rem",
                            marginTop: "0.3rem",
                            borderLeft: "3px solid #44b2d3",
                          }}
                        >
                          {elem.ranking.more}
                          <FaAngleDown style={{ marginTop: "0.2rem", marginLeft: "0.3rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsData;
