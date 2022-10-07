import React, { useState, useEffect } from "react";
import Button from "../button";
import classes from "./style.module.css";


const url = "https://jsonplaceholder.typicode.com/todos";

let x = true;
let y = true;
let z = true;


const TodoList = () => {
	const [selectedTodo, setSelectedTodo] = useState();
	const [todos, setTodos] = useState([]);
	
	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((todos) => {
				setTodos(todos);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	// Sıralama

	let sortId = () => {
		if (x === true) {
			setTodos(todos.slice(0, 15).sort((a, b) => {
				return b.id - a.id
			}))
			x = false
		}
		else {
			setTodos(todos.slice(0, 15).sort((a, b) => {
				return a.id - b.id
			}))
			x = true;
		}
	}
	let sortTitle = () => {
		if (z === true) {
			setTodos(todos.slice(0, 15).sort((a, b) => {
				const nameA = a.title.toUpperCase();
				const nameB = b.title.toUpperCase()

				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			}))
			z = false;
		}
		else {
			setTodos(todos.slice(0, 15).sort((a, b) => {
				const nameA = a.title.toUpperCase();


				if (nameA > a) {
					console.log("?")
					return 1;
				}
				else {
					return -1;
				}
			}))
			z = true;

		}
	}
	let sortIsCompleted = () => {
		if (y === true) {
			setTodos(todos.slice(0, 15).sort((a, b) => {
				return b.completed - a.completed
			}))
			y = false
		}
		else {
			setTodos(todos.slice(0, 15).sort((a, b) => {
				return a.completed - b.completed
			}))
			y = true
		}
	}


	
		// SAYFALAMA 

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage] = useState(15);

	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);

	// console.log(currentPosts)

	
	const Pagination = () => {
		let totalPosts = todos.length;
		const pageNumbers = [];
		const paginate = (pageNumber) => setCurrentPage(pageNumber);

		for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
			pageNumbers.push(i)
		}

		return (
			<nav>
				<ul className={`${classes.pagination} pagination`}>
					{pageNumbers.map(number => (
						<li key={number} className="page-item">
							<a onClick={() =>
								paginate(number)}
								href="!#"
								className="page-link">{number}</a>

						</li>
					))}
				</ul>
			</nav>
		)
	}





	const renderThead = () => {
		return (
			<thead>
				<tr>
					<th onClick={sortId}>id</th>
					<th onClick={sortTitle}>başlık</th>
					<th onClick={sortIsCompleted}>durum</th>
					<th>Aksiyon</th>
				</tr>
			</thead>
		);
	};
	const remove = (todo) => {
		if (window.confirm("Silmek üzerisiniz emin misiniz")) {
			setTodos((prev) => {
				return prev.filter((x) => x.id !== todo.id);
			});
		}
	};
	const edit = (todo) => {
		setSelectedTodo(todo)
		setTodos((prev) => {
			return prev.filter((x) => x.title === todo.title)
		})


	};


	const renderBody = () => {
		return (
			<tbody>
				{currentPosts.slice(0, 15).map((todo, index) => {
					return (
						<tr key={index}>
							<td>{todo.id}</td>
							<td>{todo.title}</td>
							<td>{todo.completed ? "Tamamlandı" : "Yapılacak"}</td>
							<td>
								<Button
									className={`btn btn-sm btn-danger ${classes} `}
									onClick={() => remove(todo)}
								>
									Sil
								</Button>
								<Button
									onClick={() => edit(todo)}
									className="btn btn-sm btn-warning"
								>
									Düzenle
								</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		);
	};


	const renderEditForm = () => {
		return (
			<div className="bg-success">
				<input className="form-control" type="text"
					value={selectedTodo}
					onChange={(e) => setSelectedTodo(e.target.value)} />

				<div className={classes.divButton}>
					<Button
						type="button"
						onClick={() => setSelectedTodo(undefined)}
						className="btn btn-danger"
						data-bs-dismiss="modal" style={{ marginRight: "15px" }}>Vazgeç

					</Button>
					<Button
						type="button"
						className="btn btn-primary" onClick={() => setSelectedTodo(selectedTodo)}>Kaydet</Button>
				</div>
			</div>
		);
	};
	return (
		<div className={`${classes.container} container`}>
			{selectedTodo && renderEditForm()}
			<table className="table">
				{renderThead()}
				{renderBody()}
			</table>
			{Pagination()}
		</div>
	);
};

export default TodoList;
